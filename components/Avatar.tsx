import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { useTranslation } from '../context/LanguageContext';

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  editable?: boolean;
  onError?: (message: string) => void;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ size = 'md', editable = false, onError, className }) => {
  const { user, updateUserProfilePicture } = useContext(AuthContext);
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const sizeClasses = {
    sm: 'h-10 w-10 text-sm',
    md: 'h-16 w-16 text-lg',
    lg: 'h-24 w-24 text-2xl',
  };

  const handleAvatarClick = () => {
    if (editable && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    onError?.('');
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validation
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      onError?.(t('avatar.errorFormat'));
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      onError?.(t('avatar.errorSize', { size: MAX_FILE_SIZE_MB }));
      return;
    }
    
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      const photoUrlWithCacheBuster = `${data.publicUrl}?t=${new Date().getTime()}`;

      await updateUserProfilePicture(photoUrlWithCacheBuster);

    } catch (error: any) {
      onError?.(error.message || t('avatar.errorUpload'));
      console.error(error);
    } finally {
      setIsUploading(false);
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1 && names[names.length - 1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (!user) return null;

  return (
    <div className={`relative group shrink-0 ${className}`}>
      <div
        className={`relative rounded-2xl flex items-center justify-center bg-dawn-purple text-white font-bold overflow-hidden ${sizeClasses[size]} ${editable ? 'cursor-pointer' : ''}`}
        onClick={handleAvatarClick}
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt="Foto de perfil" className="h-full w-full object-cover" />
        ) : (
          <span>{getInitials(user.name)}</span>
        )}
        {editable && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
            {isUploading ? (
               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </div>
        )}
      </div>
      {editable && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept={ALLOWED_FILE_TYPES.join(',')}
          disabled={isUploading}
        />
      )}
    </div>
  );
};