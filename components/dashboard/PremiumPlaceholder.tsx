
import React from 'react';

interface PremiumPlaceholderProps {
  onClick: () => void;
}

export const PremiumPlaceholder: React.FC<PremiumPlaceholderProps> = ({ onClick }) => {
  return (
    <div className="bg-gradient-to-br from-dawn-blue to-dawn-purple text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-2">Desbloquea la Conversación</h2>
      <p className="mb-4 text-sm opacity-90">
        Responde a tu mensaje, explora tus pensamientos y accede a ejercicios guiados con Premium.
      </p>
      <button 
        onClick={onClick}
        className="bg-white text-night-blue font-bold py-2 px-5 rounded-full shadow-md hover:bg-gray-100 transition duration-300 w-full">
        Saber más
      </button>
    </div>
  );
};
