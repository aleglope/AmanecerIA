
import React from 'react';
import { useTranslation } from '../context/LanguageContext';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const { t } = useTranslation();
  return (
    <section className="bg-gradient-to-br from-dawn-orange/50 via-dawn-pink/50 to-dawn-blue/50 dark:from-night-blue/50 dark:via-gray-800/50 dark:to-dawn-blue/30 text-night-blue dark:text-night-text">
      <div className="container mx-auto px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              {t('landing.hero.title')}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0 opacity-80 dark:opacity-90">
              {t('landing.hero.subtitle')}
            </p>
            <button 
              onClick={onCtaClick}
              className="bg-white text-night-blue font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition duration-300 transform hover:scale-105">
              {t('landing.hero.cta')}
            </button>
          </div>
          <div className="flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop" 
              alt="Ilustración abstracta con colores suaves del amanecer" 
              className="rounded-2xl shadow-xl w-full max-w-md object-cover aspect-square"
            />
          </div>
        </div>
      </div>
    </section>
  );
};