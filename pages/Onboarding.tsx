
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FOCUS_OPTIONS } from '../constants';
import { Focus } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { FocusCard } from '../components/FocusCard';


export default function Onboarding() {
  const { t } = useTranslation();
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
                <span className="text-sm font-semibold text-dawn-purple bg-dawn-purple/10 py-1 px-3 rounded-full">{t('onboarding.step')}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-night-text mt-4">{t('onboarding.title')}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">{t('onboarding.subtitle')}</p>
            </div>
            
            <div className="space-y-4 mb-8">
                {FOCUS_OPTIONS.map(focus => (
                    <FocusCard 
                        key={focus} 
                        titleKey={focus}
                        selected={selectedFocus === focus}
                        onClick={() => setSelectedFocus(focus)}
                        size="lg"
                    />
                ))}
            </div>
            
            <button 
                onClick={handleContinue}
                disabled={!selectedFocus}
                className="w-full bg-night-blue text-white dark:bg-gray-200 dark:text-night-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-700 dark:hover:bg-white disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105"
            >
                {t('onboarding.button')}
            </button>
        </div>
    </div>
  );
}