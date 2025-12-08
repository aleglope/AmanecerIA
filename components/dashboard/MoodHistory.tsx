import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "../../context/LanguageContext";
import { DashboardMoodLabel } from "../../types";
import { DASHBOARD_MOODS, REVERSE_MOOD_MAP } from "../../constants";
import { MoodChart } from "./MoodChart";
import { moodRepository, MoodEntry } from "../../repositories/moodRepository";

interface MoodHistoryProps {
  refreshTrigger: number;
  onUnlockClick?: () => void;
}

const moodLabelKeys = DASHBOARD_MOODS.map((m) => m.labelKey);

const MoodHistoryItem: React.FC<{ entry: MoodEntry }> = ({ entry }) => {
  const { t, language } = useTranslation();
  const formattedDate = new Date(entry.created_at).toLocaleDateString(
    language,
    {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const moodKey = REVERSE_MOOD_MAP[entry.mood_label];
  let displayLabel = "";

  if (moodKey) {
    // @ts-ignore - Dynamic key usage is safe here due to REVERSE_MOOD_MAP structure, but TypeScript can't verify it easily without strict keys
    displayLabel = t(`moodLabels.${moodKey}`);
  } else if (moodLabelKeys.includes(entry.mood_label as DashboardMoodLabel)) {
    // @ts-ignore
    displayLabel = t(`moodLabels.${entry.mood_label}`);
  } else {
    displayLabel = entry.mood_label;
  }

  return (
    <li className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{entry.mood_emoji}</span>
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          {displayLabel}
        </span>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {formattedDate}
      </span>
    </li>
  );
};

const SkeletonLoader: React.FC = () => (
  <div className="space-y-3 animate-pulse">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex items-center justify-between py-3">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    ))}
  </div>
);

export const MoodHistory: React.FC<MoodHistoryProps> = ({
  refreshTrigger,
  onUnlockClick,
}) => {
  const { t } = useTranslation();
  const { user, updateUserToPremium } = useContext(AuthContext);
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;

      setIsLoading(true);
      setError("");

      try {
        const data = await moodRepository.getMoodHistory(user.id, 10);
        setHistory(data);
      } catch (err: any) {
        console.error("Error fetching mood history:", err);
        setError(t("dashboard.moodHistory.error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [user, refreshTrigger, t]);

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonLoader />;
    }
    if (error) {
      return <p className="text-center text-red-500 py-4">{error}</p>;
    }
    if (history.length === 0) {
      return (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
          {t("dashboard.moodHistory.empty")}
        </p>
      );
    }

    return (
      <ul className="divide-y divide-gray-100 dark:divide-gray-700">
        {history.slice(0, 5).map((entry) => (
          <MoodHistoryItem key={entry.id} entry={entry} />
        ))}
      </ul>
    );
  };

  if (!user) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-800 dark:text-night-text mb-4">
        {t("dashboard.moodHistory.title")}
      </h2>

      {/* Chart Section */}
      <div className="mb-6 relative">
        <div
          className={
            !user.is_premium
              ? "filter blur-sm select-none pointer-events-none transition-all duration-500"
              : ""
          }
        >
          <MoodChart data={history} />
        </div>

        {!user.is_premium && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/60 dark:bg-gray-900/60 backdrop-blur-[3px] rounded-xl">
            <p className="text-gray-800 dark:text-white font-semibold mb-2 text-center px-4">
              {t("dashboard.moodHistory.premiumChartTitle")}
            </p>
            <button
              onClick={onUnlockClick}
              className="bg-gradient-to-r from-dawn-purple to-dawn-pink text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
              {t("dashboard.moodHistory.unlockTrends")}
            </button>
          </div>
        )}
      </div>

      {renderContent()}
    </div>
  );
};
