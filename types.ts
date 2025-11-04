export type Mood = 'Ansiedad' | 'Baja Motivación' | 'Abrumado/a' | 'Neutral' | 'Optimista';

export type Focus = 'Autoestima' | 'Ansiedad' | 'Motivación';

export type User = {
  id: string;
  name?: string;
  email?: string;
  focus?: Focus;
  photoURL?: string;
};
