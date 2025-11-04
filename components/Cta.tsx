
import React from 'react';
import { useTranslation } from '../context/LanguageContext';

interface CtaProps {
  onCtaClick: () => void;
}

export const Cta: React.FC<CtaProps> = ({ onCtaClick }) => {
  const { t } = useTranslation();
  return (
    <section id="cta" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-night-text mb-2">
          {t('landing.cta.title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {t('landing.cta.subtitle')}
        </p>
        <button 
          onClick={onCtaClick}
          className="bg-night-blue text-white dark:bg-gray-200 dark:text-night-blue font-bold py-3 px-8 rounded-full hover:bg-gray-700 dark:hover:bg-white transition duration-300 transform hover:scale-105">
          {t('landing.cta.button')}
        </button>
      </div>
    </section>
  );
};