
import React from 'react';
import { useTranslation } from '../../context/LanguageContext';

interface PremiumPlaceholderProps {
  onClick: () => void;
}

export const PremiumPlaceholder: React.FC<PremiumPlaceholderProps> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-br from-dawn-blue to-dawn-purple text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-2">{t('dashboard.premiumPlaceholder.title')}</h2>
      <p className="mb-4 text-sm opacity-90">
        {t('dashboard.premiumPlaceholder.subtitle')}
      </p>
      <button 
        onClick={onClick}
        className="bg-white text-night-blue font-bold py-2 px-5 rounded-full shadow-md hover:bg-gray-100 transition duration-300 w-full">
        {t('dashboard.premiumPlaceholder.button')}
      </button>
    </div>
  );
};