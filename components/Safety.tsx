
import React from 'react';
import { useTranslation } from '../context/LanguageContext';

export const Safety: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="safety" className="py-20 bg-white dark:bg-night-blue">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-6 rounded-r-lg">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-2">
            {t('landing.safety.title')}
          </h2>
          <p className="text-red-700 dark:text-red-300">
            {t('landing.safety.text')} <a href="#" className="font-semibold underline hover:text-red-900 dark:hover:text-red-100">{t('landing.safety.link')}</a>
          </p>
        </div>
      </div>
    </section>
  );
};