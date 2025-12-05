import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "../../context/LanguageContext";
import { Avatar } from "../Avatar";

export const ProfileHeader: React.FC = () => {
  const { user, streak } = useContext(AuthContext);
  const { t } = useTranslation();

  if (!user) return null;

  return (
    <div className="flex items-center justify-between mb-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center space-x-4">
        <Avatar src={user.photoURL} alt={user.name || "User"} size="md" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-night-text">
            {t("dashboard.profileHeader.greeting", {
              name: user.name || "User",
            })}
          </h1>
          <div className="flex items-center space-x-2">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {streak > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 animate-pulse">
                🔥 {streak} {streak === 1 ? "día" : "días"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
