import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';
import { useTranslation } from '../../context/LanguageContext';
import { EmojiMood } from '../../types';
import { DASHBOARD_MOODS, MOOD_MAP } from '../../constants';

interface MoodTrackerProps {
    onMoodSaved: () => void;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({ onMoodSaved }) => {
    const { t } = useTranslation();
    const [selectedMood, setSelectedMood] = useState<EmojiMood | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { user } = useContext(AuthContext);

    const handleMoodSelect = async (mood: EmojiMood) => {
        if (!user || isSaving) return;

        setIsSaving(true);
        setError('');
        setSuccessMessage('');
        setSelectedMood(mood);

        try {
            // Convert the language-agnostic key (e.g., 'great') to the Spanish value the DB ENUM expects (e.g., 'Genial')
            const dbLabel = MOOD_MAP[mood.labelKey];

            const { error: insertError } = await supabase
                .from('mood_history')
                .insert([{
                    user_id: user.id,
                    mood_label: dbLabel,
                    mood_emoji: mood.emoji,
                }]);

            if (insertError) {
                throw insertError;
            }

            const translatedLabel = t(`moodLabels.${mood.labelKey}`);
            setSuccessMessage(t('dashboard.moodTracker.success', { mood: translatedLabel }));
            onMoodSaved();

        } catch (err: any) {
            console.error('Error saving mood:', err);
            setError(t('dashboard.moodTracker.error'));
            setSelectedMood(null); // Revert selection on error
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-night-text mb-1">{t('dashboard.moodTracker.title')}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">{t('dashboard.moodTracker.subtitle')}</p>
            <div className="flex justify-around items-center">
                {DASHBOARD_MOODS.map(mood => (
                    <button 
                        key={mood.labelKey}
                        onClick={() => handleMoodSelect(mood)}
                        disabled={isSaving}
                        className={`p-2 rounded-full transition-all duration-200 transform hover:scale-125 disabled:opacity-50 disabled:cursor-wait ${selectedMood?.labelKey === mood.labelKey ? 'bg-dawn-blue/50' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        aria-label={t(`moodLabels.${mood.labelKey}`)}
                    >
                        <span className="text-3xl md:text-4xl">{mood.emoji}</span>
                    </button>
                ))}
            </div>
            {(successMessage || error) && (
                <div className={`text-center mt-4 py-2 rounded-lg text-sm font-semibold ${
                    error 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                }`}>
                    {error || successMessage}
                </div>
            )}
        </div>
    );
};