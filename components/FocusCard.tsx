import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Focus } from '../types';

interface FocusCardProps {
  titleKey: Focus;
  selected: boolean;
  onClick: () => void;
  size?: 'md' | 'lg';
}

export const FocusCard: React.FC<FocusCardProps> = ({ titleKey, selected, onClick, size = 'md' }) => {
    const { t } = useTranslation();
    
    const sizeClasses = {
        padding: size === 'lg' ? 'p-6' : 'p-4',
        textSize: size === 'lg' ? 'text-xl' : 'text-lg',
        shadow: selected ? (size === 'lg' ? 'shadow-lg' : 'shadow-md') : ''
    };

    return (
        <button
            onClick={onClick}
            className={`w-full text-left border-2 rounded-lg transition-all duration-200 ${sizeClasses.padding} ${
                selected
                ? `border-dawn-purple bg-dawn-purple/10 ${sizeClasses.shadow}`
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
        >
            <h3 className={`${sizeClasses.textSize} font-bold text-gray-800 dark:text-night-text`}>
                {t(`focuses.${titleKey}`)}
            </h3>
        </button>
    );
};
