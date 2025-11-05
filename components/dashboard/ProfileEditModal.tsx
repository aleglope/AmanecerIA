import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { User } from '../../types';
import { LoadingSpinner } from '../LoadingSpinner';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose, user }) => {
  const { t } = useTranslation();
  const { updateUserName } = useContext(AuthContext);
  const [name, setName] = useState(user.name || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(user.name || '');
      setError('');
    }
  }, [isOpen, user.name]);

  const handleSave = async () => {
    if (!name.trim()) {
      setError(t('profileEditModal.errorNameRequired'));
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await updateUserName(name);
      onClose();
    } catch (err) {
      setError(t('profileEditModal.errorGeneric'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-sm w-full"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-night-text mb-6">
          {t('profileEditModal.title')}
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="profile-name">
            {t('auth.nameLabel')}
          </label>
          <input 
            id="profile-name" 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="shadow-sm appearance-none border dark:border-gray-600 rounded-lg w-full py-2 px-3 text-gray-700 dark:text-night-text bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-dawn-blue" 
          />
        </div>

        {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-3 rounded-r-lg mb-4">
                <p className="text-red-800 dark:text-red-200 text-sm font-semibold text-center">{error}</p>
            </div>
        )}

        <div className="mt-6 flex gap-4">
          <button 
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-night-text font-bold py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
          >
            {t('profileEditModal.cancel')}
          </button>
          <button 
            onClick={handleSave}
            disabled={isLoading} 
            className="w-full bg-night-blue hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-white dark:text-night-blue text-white font-bold py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center justify-center disabled:bg-gray-400"
          >
            {isLoading ? <LoadingSpinner /> : t('profileEditModal.save')}
          </button>
        </div>
      </div>
    </div>
  );
};