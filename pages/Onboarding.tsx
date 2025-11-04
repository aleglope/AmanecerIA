
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FOCUS_OPTIONS } from '../constants';
import { Focus } from '../types';

const FocusCard: React.FC<{ title: Focus; selected: boolean; onClick: () => void }> = ({ title, selected, onClick }) => (
    <button 
        onClick={onClick}
        className={`w-full text-left p-6 border-2 rounded-lg transition-all duration-200 ${
            selected 
            ? 'border-dawn-purple bg-dawn-purple/10 shadow-lg' 
            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
    >
        <h3 className="text-xl font-bold text-gray-800 dark:text-night-text">{title}</h3>
    </button>
);


export default function Onboarding() {
  const [selectedFocus, setSelectedFocus] = useState<Focus | null>(null);
  const { updateUserFocus } = useContext(AuthContext);

  const handleContinue = () => {
    if (selectedFocus) {
      updateUserFocus(selectedFocus);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-night-blue flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full">
            <div className="text-center mb-8">
                <span className="text-sm font-semibold text-dawn-purple bg-dawn-purple/10 py-1 px-3 rounded-full">Paso 1 de 1</span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-night-text mt-4">¿Cuál es el enfoque que más necesitas hoy?</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Puedes cambiar esto cuando quieras.</p>
            </div>
            
            <div className="space-y-4 mb-8">
                {FOCUS_OPTIONS.map(focus => (
                    <FocusCard 
                        key={focus} 
                        title={focus}
                        selected={selectedFocus === focus}
                        onClick={() => setSelectedFocus(focus)}
                    />
                ))}
            </div>
            
            <button 
                onClick={handleContinue}
                disabled={!selectedFocus}
                className="w-full bg-night-blue text-white dark:bg-gray-200 dark:text-night-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-700 dark:hover:bg-white disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105"
            >
                Ver mi mensaje de hoy
            </button>
        </div>
    </div>
  );
}