import React, { useContext, useState, useEffect } from "react";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "../context/LanguageContext";
import { Avatar } from "../components/Avatar";
import {
  NotificationPreferences,
  NotificationTone,
  NotificationLength,
} from "../types";
import { NOTIFICATION_TONES, NOTIFICATION_LENGTHS } from "../constants";
import {
  subscribeUserToPush,
  unsubscribeUserFromPush,
} from "../utils/notificationUtils";
import { LoadingSpinner } from "../components/LoadingSpinner";
import rotaryLogo from "../assets/rotaryinternational.svg";

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const {
    user,
    updateUserName,
    updateUserPushSubscription,
    updateUserNotificationPreferences,
  } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || "");
  const [avatarError, setAvatarError] = useState("");
  const [prefs, setPrefs] = useState<NotificationPreferences>(
    user?.notificationPreferences || { tone: "Amable", length: "Medio" }
  );
  const [isSubscribed, setIsSubscribed] = useState(!!user?.pushSubscription);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Initialize form state when the user context is first available or the user changes.
    if (user) {
      setName(user.name || "");
      setPrefs(
        user.notificationPreferences || { tone: "Amable", length: "Medio" }
      );
    }
  }, [user?.id]); // Only re-initialize if the user ID changes

  useEffect(() => {
    // Keep the subscription toggle synchronized with the actual subscription state from the context.
    // This is the source of truth.
    if (user) {
      setIsSubscribed(!!user.pushSubscription);
    }
  }, [user?.pushSubscription]);

  const handleSaveChanges = async () => {
    if (!user) return;
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const promises = [];
      if (name !== user.name) {
        promises.push(updateUserName(name));
      }
      promises.push(updateUserNotificationPreferences(prefs));

      await Promise.all(promises);

      setSuccess(t("settingsPage.successMessage"));
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(t("settingsPage.errorMessage"));
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubscriptionToggle = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;

    setIsSubscribed(isChecked);
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      if (isChecked) {
        // This covers the initial permission request.
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          // This can also trigger a prompt and fail, which is handled in the catch block.
          await subscribeUserToPush(updateUserPushSubscription);
        } else {
          // User denied permission at the first prompt. Revert UI silently.
          console.log("Notification permission was not granted.");
          setIsSubscribed(false);
        }
      } else {
        // User wants to unsubscribe
        const wasUnsubscribed = await unsubscribeUserFromPush();
        if (wasUnsubscribed) {
          await updateUserPushSubscription(null);
        } else {
          throw new Error("Failed to unsubscribe from browser push manager.");
        }
      }
    } catch (err: any) {
      const isPermissionError =
        err.name === "NotAllowedError" ||
        (err.message &&
          err.message.toLowerCase().includes("permission denied"));
      if (isPermissionError) {
        console.log("Subscription failed: Permission denied by user.");
        // Silently revert the optimistic UI update.
        setIsSubscribed(false);
      } else {
        // Handle other, unexpected errors.
        console.error("Failed to toggle subscription:", err);
        setError(t("settingsPage.errorMessage"));
        // Revert to the actual state from context.
        setIsSubscribed(!!user?.pushSubscription);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrefChange = (
    field: keyof NotificationPreferences,
    value: NotificationTone | NotificationLength
  ) => {
    setPrefs((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-night-blue">
      <Header onSettingsClick={onBack} />
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-night-blue dark:hover:text-white font-semibold mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("premiumPage.backButton")}
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-night-text">
            {t("settingsPage.title")}
          </h1>
        </div>

        <div className="max-w-2xl mx-auto space-y-12">
          {/* Profile Section */}
          <section>
            <h2 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-6">
              {t("settingsPage.profileSection.title")}
            </h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar editable size="lg" onError={setAvatarError} />
                {avatarError && (
                  <p className="text-sm text-red-500">{avatarError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t("auth.nameLabel")}
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-dawn-purple focus:border-dawn-purple sm:text-sm"
                />
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section>
            <h2 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-6">
              {t("settingsPage.notificationsSection.title")}
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-night-text">
                    {t("settingsPage.notificationsSection.enableLabel")}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("settingsPage.notificationsSection.enableDescription")}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSubscribed}
                    onChange={handleSubscriptionToggle}
                    className="sr-only peer"
                    disabled={isSaving}
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-focus:ring-4 peer-focus:ring-dawn-blue/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-dawn-purple"></div>
                </label>
              </div>
              <div
                className={`bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4 transition-opacity ${
                  !isSubscribed ? "opacity-50" : ""
                }`}
              >
                <h3 className="font-semibold text-gray-800 dark:text-night-text">
                  {t("settingsPage.notificationsSection.preferencesTitle")}
                </h3>
                <div>
                  <label
                    htmlFor="tone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t("settingsPage.notificationsSection.toneLabel")}
                  </label>
                  <select
                    id="tone"
                    value={prefs.tone}
                    disabled={!isSubscribed}
                    onChange={(e) =>
                      handlePrefChange(
                        "tone",
                        e.target.value as NotificationTone
                      )
                    }
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-dawn-purple focus:border-dawn-purple sm:text-sm rounded-md disabled:cursor-not-allowed"
                  >
                    {NOTIFICATION_TONES.map((tone) => (
                      <option key={tone} value={tone}>
                        {t(`notificationTones.${tone}`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="length"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t("settingsPage.notificationsSection.lengthLabel")}
                  </label>
                  <select
                    id="length"
                    value={prefs.length}
                    disabled={!isSubscribed}
                    onChange={(e) =>
                      handlePrefChange(
                        "length",
                        e.target.value as NotificationLength
                      )
                    }
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-dawn-purple focus:border-dawn-purple sm:text-sm rounded-md disabled:cursor-not-allowed"
                  >
                    {NOTIFICATION_LENGTHS.map((length) => (
                      <option key={length} value={length}>
                        {t(`notificationLengths.${length}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && (
              <p className="text-green-600 text-center mb-4">{success}</p>
            )}
            <button
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="w-full bg-night-blue text-white dark:bg-gray-200 dark:text-night-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-700 dark:hover:bg-white disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 flex items-center justify-center"
            >
              {isSaving ? <LoadingSpinner /> : t("settingsPage.saveButton")}
            </button>
          </div>

          <div className="mt-12 flex justify-center pb-6">
            <img
              src={rotaryLogo}
              alt="Rotary International"
              className="h-16 w-auto opacity-90 dark:opacity-80"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
