
export type Mood = 'Ansiedad' | 'Baja Motivación' | 'Abrumado/a' | 'Neutral' | 'Optimista';

export type Focus = 'Autoestima' | 'Ansiedad' | 'Motivación';

export type DashboardMoodLabel = 'very_bad' | 'neutral' | 'ok' | 'great' | 'very_good';

export type EmojiMood = { emoji: string; labelKey: DashboardMoodLabel; };

export type User = {
  id: string;
  name?: string;
  email?: string;
  focus?: Focus;
  photoURL?: string;
  is_premium?: boolean;
};
