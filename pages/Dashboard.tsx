import React, { useState, useContext } from "react";
import { Header } from "../components/Header";
import { MessageCard } from "../components/dashboard/MessageCard";
import { MoodTracker } from "../components/dashboard/MoodTracker";
import { MoodHistory } from "../components/dashboard/MoodHistory";
import { ProfileHeader } from "../components/dashboard/ProfileHeader";
import { AuthContext } from "../context/AuthContext";
import PremiumPlansPage from "./PremiumPlansPage"; // Reverted to PremiumPlansPage as it likely exists
import ChatPage from "./ChatPage";
import SettingsPage from "./SettingsPage"; // Default import
import { ExercisesPage } from "./ExercisesPage"; // Named import
import { useTranslation } from "../context/LanguageContext";
import { EmojiMood } from "../types";
import { FocusEditModal } from "../components/dashboard/FocusEditModal"; // Added missing import

type ViewState = "dashboard" | "premium" | "chat" | "settings" | "exercises";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();
  const [view, setView] = useState<ViewState>("dashboard");
  const [moodUpdateTrigger, setMoodUpdateTrigger] = useState(0);
  const [isFocusEditModalOpen, setIsFocusEditModalOpen] = useState(false);
  const [currentMood, setCurrentMood] = useState<EmojiMood | null>(null);

  const handleMoodSaved = (mood?: EmojiMood) => {
    setMoodUpdateTrigger((prev) => prev + 1);
    if (mood) {
      setCurrentMood(mood);
    }
  };

  if (view === "premium") {
    return <PremiumPlansPage onBack={() => setView("dashboard")} />;
  }

  if (view === "chat") {
    return <ChatPage onBack={() => setView("dashboard")} />;
  }

  if (view === "settings") {
    return <SettingsPage onBack={() => setView("dashboard")} />;
  }

  if (view === "exercises") {
    return <ExercisesPage onBack={() => setView("dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-night-blue transition-colors duration-500">
      <Header
        onSettingsClick={() => setView("settings")}
        onPremiumClick={() => setView("premium")}
      />
      <main className="container mx-auto px-4 sm:px-6 py-8 pb-24">
        <ProfileHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <MessageCard
              onEditFocusClick={() => setIsFocusEditModalOpen(true)}
              currentMood={currentMood}
            />
            <MoodTracker onMoodSaved={handleMoodSaved} />
            {/* New Quick Actions Section */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setView("chat")}
                className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-2xl">💬</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {t("chatPage.title")}
                </span>
              </button>
              <button
                onClick={() => setView("exercises")}
                className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-2xl">🧘</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {t("exercises.title")}
                </span>
              </button>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <MoodHistory
              refreshTrigger={moodUpdateTrigger}
              onUnlockClick={() => setView("premium")}
            />
          </div>
        </div>
      </main>
      <FocusEditModal
        isOpen={isFocusEditModalOpen}
        onClose={() => setIsFocusEditModalOpen(false)}
      />
    </div>
  );
}
