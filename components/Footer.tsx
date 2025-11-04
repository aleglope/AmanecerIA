
import React from 'react';
import { useTranslation } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-night-blue text-night-text">
      <div className="container mx-auto px-6 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        <div className="mt-4">
          <a href="#" className="px-3 hover:underline">{t('footer.terms')}</a>
          <span className="text-gray-500">|</span>
          <a href="#" className="px-3 hover:underline">{t('footer.privacy')}</a>
        </div>
      </div>
    </footer>
  );
};