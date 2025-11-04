
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';
import { useTranslation } from '../../context/LanguageContext';

interface MoodEntry {
  id: string;
  created_at: string;
  mood_emoji: string;
  mood_label: string; // This now holds the labelKey, e.g., 'very_bad'
}

interface MoodHistoryProps {
    refreshTrigger: number;
}

const MoodHistoryItem: React.FC<{ entry: MoodEntry }> = ({ entry }) => {
    const { t, language } = useTranslation();
    const formattedDate = new Date(entry.created_at).toLocaleDateString(language, {
        month: 'long',
        day: 'numeric',
    });

    return (
        <li className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
                <span className="text-2xl">{entry.mood_emoji}</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">{t(`moodLabels.${entry.mood_label}`)}</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</span>
        </li>
    );
};

const SkeletonLoader: React.FC = () => (
    <div className="space-y-3 animate-pulse">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
        ))}
    </div>
);


export const MoodHistory: React.FC<MoodHistoryProps> = ({ refreshTrigger }) => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);
    const [history, setHistory] = useState<MoodEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;

            setIsLoading(true);
            setError('');

            try {
                const { data, error: fetchError } = await supabase
                    .from('mood_history')
                    .select('id, created_at, mood_emoji, mood_label')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(7);

                if (fetchError) {
                    throw fetchError;
                }

                setHistory(data || []);
            } catch (err: any) {
                console.error('Error fetching mood history:', err);
                setError(t('dashboard.moodHistory.error'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [user, refreshTrigger, t]);

    const renderContent = () => {
        if (isLoading) {
            return <SkeletonLoader />;
        }
        if (error) {
            return <p className="text-center text-red-500 py-4">{error}</p>;
        }
        if (history.length === 0) {
            return <p className="text-center text-gray-500 dark:text-gray-400 py-4">{t('dashboard.moodHistory.empty')}</p>;
        }

        return (
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                {history.map(entry => (
                    <MoodHistoryItem key={entry.id} entry={entry} />
                ))}
            </ul>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-night-text mb-4">{t('dashboard.moodHistory.title')}</h2>
            {renderContent()}
        </div>
    );
};