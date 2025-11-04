
import React from 'react';

interface FeatureListItemProps {
    icon: React.ReactElement;
    title: string;
    description: string;
}

export const FeatureListItem: React.FC<FeatureListItemProps> = ({ icon, title, description }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-dawn-blue/20 text-dawn-purple mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-night-text mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
        </div>
    );
};