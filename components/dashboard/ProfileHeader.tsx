import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Avatar } from '../Avatar';
import { useTranslation } from '../../context/LanguageContext';
import { ProfileEditModal } from './ProfileEditModal';

export const ProfileHeader: React.FC = () => {
    const { user } = useContext(AuthContext);
    const { t } = useTranslation();
    const [uploadError, setUploadError] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!user) return null;

    return (
        <>
            <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg h-48 flex items-center p-6 md:p-8">
                <img 
                    src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop"
                    alt={t('dashboard.hero.alt')}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
                
                <div className="relative flex items-center space-x-4">
                    <Avatar editable size="lg" onError={setUploadError} className="border-4 border-white/50 rounded-2xl" />
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl sm:text-3xl font-bold text-white shadow-sm">
                                {t('dashboard.profileHeader.greeting', { name: user.name || '' })}
                            </h1>
                            <button 
                                onClick={() => setIsEditModalOpen(true)} 
                                className="text-white/80 hover:text-white transition-colors p-1 rounded-full bg-black/20 hover:bg-black/40"
                                aria-label={t('profileEditModal.editAriaLabel')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {uploadError && <p className="text-red-300 bg-red-900/50 px-2 py-1 rounded text-sm mt-2">{uploadError}</p>}
                    </div>
                </div>
            </div>
            <ProfileEditModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)}
                user={user}
            />
        </>
    );
};