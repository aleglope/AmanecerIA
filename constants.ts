
import { Mood, Focus } from './types';

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