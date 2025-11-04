import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';

type EmojiMood = { emoji: string; label: string; };

const EMOJI_MOODS: EmojiMood[] = [
    { emoji: '😞', label: 'Muy mal' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '🙂', label: 'Bien' },
    { emoji: '😄', label: 'Genial' },
    { emoji: '🤩', label: 'Increíble' },
];

export const MoodTracker: React.FC = () => {
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
            const { error: insertError } = await supabase
                .from('mood_history')
                .insert({
                    user_id: user.id,
                    mood_label: mood.label,
                    mood_emoji: mood.emoji,
                });

            if (insertError) {
                throw insertError;
            }

            setSuccessMessage(`Has registrado: ${mood.label}`);

        } catch (err: any) {
            console.error('Error saving mood:', err);
            setError('No se pudo guardar tu ánimo. Inténtalo de nuevo.');
            setSelectedMood(null); // Revert selection on error
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-night-text mb-1">¿Cómo te sientes ahora?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">Registra tu estado de ánimo.</p>
            <div className="flex justify-around items-center">
                {EMOJI_MOODS.map(mood => (
                    <button 
                        key={mood.label}
                        onClick={() => handleMoodSelect(mood)}
                        disabled={isSaving}
                        className={`p-2 rounded-full transition-all duration-200 transform hover:scale-125 disabled:opacity-50 disabled:cursor-wait ${selectedMood?.emoji === mood.emoji ? 'bg-dawn-blue/50' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        aria-label={mood.label}
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