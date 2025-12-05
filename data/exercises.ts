export interface Exercise {
  id: string;
  titleKey: string;
  descriptionKey: string;
  duration: string;
  type: "CBT" | "Mindfulness" | "Breathing";
  contentKey: string;
}

export const EXERCISES: Exercise[] = [
  {
    id: "1",
    titleKey: "exercises.boxBreathing.title",
    descriptionKey: "exercises.boxBreathing.desc",
    duration: "5 min",
    type: "Breathing",
    contentKey: "exercises.boxBreathing.content",
  },
  {
    id: "2",
    titleKey: "exercises.54321.title",
    descriptionKey: "exercises.54321.desc",
    duration: "10 min",
    type: "Mindfulness",
    contentKey: "exercises.54321.content",
  },
  {
    id: "3",
    titleKey: "exercises.reframing.title",
    descriptionKey: "exercises.reframing.desc",
    duration: "15 min",
    type: "CBT",
    contentKey: "exercises.reframing.content",
  },
  {
    id: "4",
    titleKey: "exercises.gratitude.title",
    descriptionKey: "exercises.gratitude.desc",
    duration: "5 min",
    type: "Mindfulness",
    contentKey: "exercises.gratitude.content",
  },
];
