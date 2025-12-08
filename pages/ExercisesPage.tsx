import React, { useState } from "react";
import { Header } from "../components/Header";
import { useTranslation } from "../context/LanguageContext";
import { EXERCISES, Exercise } from "../data/exercises";

interface ExercisesPageProps {
  onBack: () => void;
}

export const ExercisesPage: React.FC<ExercisesPageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-night-blue flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-night-blue dark:hover:text-white font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {t("premiumPage.backButton")}
          </button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-night-text">
            {t("exercises.title")}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXERCISES.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => setSelectedExercise(exercise)}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold 
                                    ${
                                      exercise.type === "CBT"
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                        : exercise.type === "Mindfulness"
                                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    }`}
                >
                  {t(`exerciseTypes.${exercise.type}`)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {exercise.duration}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-night-text mb-2">
                {t(exercise.titleKey)}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                {t(exercise.descriptionKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Modal for Exercise Details */}
        {selectedExercise && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative animate-[scaleIn_0.3s_ease-out]">
              <button
                onClick={() => setSelectedExercise(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="mb-6">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold 
                                    ${
                                      selectedExercise.type === "CBT"
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                        : selectedExercise.type ===
                                          "Mindfulness"
                                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    }`}
                >
                  {t(`exerciseTypes.${selectedExercise.type}`)}
                </span>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-night-text mt-2">
                  {t(selectedExercise.titleKey)}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {selectedExercise.duration}
                </p>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                  {t(selectedExercise.contentKey)}
                </p>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="bg-dawn-purple text-white px-6 py-2 rounded-full font-semibold hover:bg-dawn-purple/90 transition-colors"
                >
                  {t("common.close")}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
