
import React from 'react';

export const Safety: React.FC = () => {
  return (
    <section id="safety" className="py-20 bg-white dark:bg-night-blue">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-6 rounded-r-lg">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-2">
            Tu bienestar es nuestra prioridad.
          </h2>
          <p className="text-red-700 dark:text-red-300">
            AmanecerIA es una herramienta de apoyo, no un sustituto de terapia. Si estás en una crisis, por favor contacta a las líneas de ayuda profesionales. <a href="#" className="font-semibold underline hover:text-red-900 dark:hover:text-red-100">Encuentra ayuda aquí.</a>
          </p>
        </div>
      </div>
    </section>
  );
};