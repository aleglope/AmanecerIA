
import React from 'react';
import { Mood } from '../types';

interface MoodSelectorProps {
  moodOptions: Mood[];
  selectedMood: Mood | null;
  onSelectMood: (mood: Mood) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ moodOptions, selectedMood, onSelectMood }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {moodOptions.map((mood) => (
        <button
          key={mood}
          onClick={() => onSelectMood(mood)}
          className={`px-3 py-2 text-sm md:px-4 md:py-2 md:text-base font-semibold rounded-full transition-all duration-200 transform hover:scale-105 ${
            selectedMood === mood
              ? 'bg-dawn-purple text-white shadow-md'
              : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
        >
          {mood}
        </button>
      ))}
    </div>
  );
};