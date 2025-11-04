
import React from 'react';

export const Premium: React.FC = () => {
  return (
    <section id="premium" className="py-20 bg-gradient-to-tr from-dawn-blue to-dawn-purple dark:from-night-blue dark:to-gray-800 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          ¿Listo para profundizar?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Conviértete en Premium y desbloquea la IA Conversacional. Responde a tu mensaje, explora tus pensamientos y accede a ejercicios guiados de audio y texto.
        </p>
        <button className="bg-white text-night-blue font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition duration-300 transform hover:scale-105">
          Ver planes Premium
        </button>
      </div>
    </section>
  );
};