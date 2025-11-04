
import React from 'react';

interface CtaProps {
  onCtaClick: () => void;
}

export const Cta: React.FC<CtaProps> = ({ onCtaClick }) => {
  return (
    <section id="cta" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-night-text mb-2">
          Cambia tus mañanas. Cambia tu día.
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Únete gratis y recibe tu primer mensaje mañana.
        </p>
        <button 
          onClick={onCtaClick}
          className="bg-night-blue text-white dark:bg-gray-200 dark:text-night-blue font-bold py-3 px-8 rounded-full hover:bg-gray-700 dark:hover:bg-white transition duration-300 transform hover:scale-105">
          Empezar ahora
        </button>
      </div>
    </section>
  );
};