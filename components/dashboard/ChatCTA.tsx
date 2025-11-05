import React from 'react';
import { useTranslation } from '../../context/LanguageContext';

interface ChatCTAProps {
  onClick: () => void;
}

export const ChatCTA: React.FC<ChatCTAProps> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-br from-dawn-purple to-dawn-pink text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-2">{t('dashboard.chatCTA.title')}</h2>
      <p className="mb-4 text-sm opacity-90">
        {t('dashboard.chatCTA.subtitle')}
      </p>
      <button 
        onClick={onClick}
        className="bg-white text-night-blue font-bold py-2 px-5 rounded-full shadow-md hover:bg-gray-100 transition duration-300 w-full">
        {t('dashboard.chatCTA.button')}
      </button>
    </div>
  );
};
