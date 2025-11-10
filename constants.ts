import { Mood, Focus, EmojiMood, DashboardMoodLabel, NotificationTone, NotificationLength } from './types';

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

export const NOTIFICATION_TONES: NotificationTone[] = ['Amable', 'Directo', 'Motivador'];
export const NOTIFICATION_LENGTHS: NotificationLength[] = ['Corto', 'Medio', 'Detallado'];


export const DASHBOARD_MOODS: EmojiMood[] = [
    { emoji: '😞', labelKey: 'very_bad' },
    { emoji: '😐', labelKey: 'neutral' },
    { emoji: '🙂', labelKey: 'ok' },
    { emoji: '😄', labelKey: 'great' },
    { emoji: '🤩', labelKey: 'very_good' },
];

// Mapping of language-agnostic keys to the specific Spanish DB ENUM values.
// This is used to ensure the correct value is written to the database.
export const MOOD_MAP: Record<DashboardMoodLabel, string> = {
  'very_bad': 'Muy mal',
  'neutral': 'Neutral',
  'ok': 'Bien',
  'great': 'Genial',
  'very_good': 'Increíble',
};

// Reverse mapping generated from the primary map.
// This is used to convert the stored Spanish value back into a key for proper translation on the frontend.
export const REVERSE_MOOD_MAP: Record<string, DashboardMoodLabel> = Object.entries(MOOD_MAP)
  .reduce((acc, [key, value]) => {
    acc[value] = key as DashboardMoodLabel;
    return acc;
  }, {} as Record<string, DashboardMoodLabel>);


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