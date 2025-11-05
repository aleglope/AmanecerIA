
import { Mood, Focus, EmojiMood } from './types';

export const MOOD_OPTIONS: Mood[] = [
  'Ansiedad',
  'Baja Motivación',
  'Abrumado/a',
  'Neutral',
  'Optimista',
];

export const FOCUS_OPTIONS: Focus[] = [
  'Autoestima',
  'Ansiedad',
  'Motivación',
];

export const DASHBOARD_MOODS: EmojiMood[] = [
    { emoji: '😞', labelKey: 'very_bad' },
    { emoji: '😐', labelKey: 'neutral' },
    { emoji: '🙂', labelKey: 'ok' },
    { emoji: '😄', labelKey: 'great' },
    { emoji: '🤩', labelKey: 'very_good' },
];

export const CRISIS_KEYWORDS: { [key: string]: string[] } = {
  es: [
    'suicidio', 'suicidarme', 'matarme', 'dañarme', 'autolesión', 
    'sin esperanza', 'no quiero vivir', 'acabar con todo'
  ],
  en: [
    'suicide', 'kill myself', 'hurt myself', 'self-harm', 'no hope',
    'don\'t want to live', 'end it all', 'ending my life'
  ]
};
