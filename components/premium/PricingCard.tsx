import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { LoadingSpinner } from '../LoadingSpinner';

interface PricingCardProps {
    title: string;
    price: string;
    period: string;
    description: string;
    badge?: string;
    isRecommended?: boolean;
    onSelect: () => void;
    isLoading?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ title, price, period, description, badge, isRecommended = false, onSelect, isLoading = false }) => {
    const { t } = useTranslation();
    return (
        <div className={`w-full p-8 rounded-2xl border transition-all duration-300 ${isRecommended ? 'bg-night-blue text-white border-night-blue dark:bg-dawn-purple dark:border-dawn-purple dark:text-night-blue shadow-2xl' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
            {badge && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block ${isRecommended ? 'bg-dawn-orange text-night-blue' : 'bg-dawn-purple/20 text-dawn-purple'}`}>
                    {badge}
                </span>
            )}
            <h3 className={`text-2xl font-bold ${isRecommended ? 'dark:text-white' : ''}`}>{title}</h3>
            <p className={`mt-2 ${isRecommended ? 'text-gray-300 dark:text-gray-100' : 'text-gray-500 dark:text-gray-300'}`}>{description}</p>
            <div className="mt-6">
                <span className={`text-5xl font-extrabold ${isRecommended ? 'dark:text-white' : ''}`}>{price}</span>
                <span className={`text-lg ml-1 ${isRecommended ? 'text-gray-400 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>{period}</span>
            </div>
            <button
                onClick={onSelect}
                disabled={isLoading}
                className={`w-full mt-8 py-3 px-6 rounded-lg font-bold transition-colors duration-300 flex items-center justify-center ${isRecommended ? 'bg-white text-night-blue hover:bg-gray-200' : 'bg-night-blue text-white dark:bg-gray-200 dark:text-night-blue hover:bg-gray-700 dark:hover:bg-white'} disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
                {isLoading ? <LoadingSpinner /> : t('premiumPage.pricing.button')}
            </button>
        </div>
    );
};
