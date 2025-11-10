
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FOCUS_OPTIONS } from '../constants';
import { Focus } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { FocusCard } from '../components/FocusCard';
import { subscribeUserToPush } from '../utils/notificationUtils';

export default function Onboarding() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [selectedFocus, setSelectedFocus] = useState<Focus | null>(null);
  const { user, updateUserFocus, updateUserPushSubscription } = useContext(AuthContext);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleFocusContinue = async () => {
    if (selectedFocus) {
      await updateUserFocus(selectedFocus);
      setStep(2);
    }
  };
  
  const handleSkipNotifications = () => {
    // The user's focus is already set, so we can just let them proceed to the dashboard.
    // The App component will detect the focus and render the dashboard.
    setIsCompleted(true); 
  };
  
  const handleActivateNotifications = async () => {
    if (!('Notification' in window)) {
        console.error("This browser does not support desktop notification");
        handleSkipNotifications(); // Proceed even if not supported
        return;
    }

    setIsSubscribing(true);
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
        await subscribeUserToPush(async (subscription) => {
            await updateUserPushSubscription(subscription);
            setIsCompleted(true);
        });
    } else {
      setIsSubscribing(false);
      handleSkipNotifications();
    }
  };

  if (isCompleted && user?.focus) {
    // This state allows the component to "disappear" gracefully, letting App.tsx re-render the Dashboard.
    return null;
  }

  const renderStep1 = () => (
    <div className="max-w-md w-full animate-[fadeIn_0.5s_ease-out]">
        <div className="text-center mb-8">
            <span className="text-sm font-semibold text-dawn-purple bg-dawn-purple/10 py-1 px-3 rounded-full">{t('onboarding.step1')}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-night-text mt-4">{t('onboarding.title')}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">{t('onboarding.subtitle')}</p>
        </div>
        
        <div className="space-y-4 mb-8">
            {FOCUS_OPTIONS.map(focus => (
                <FocusCard 
                    key={focus} 
                    titleKey={focus}
                    selected={selectedFocus === focus}
                    onClick={() => setSelectedFocus(focus)}
                    size="lg"
                />
            ))}
        </div>
        
        <button 
            onClick={handleFocusContinue}
            disabled={!selectedFocus}
            className="w-full bg-night-blue text-white dark:bg-gray-200 dark:text-night-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-700 dark:hover:bg-white disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105"
        >
            {t('onboarding.button')}
        </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-md w-full text-center animate-[fadeIn_0.5s_ease-out]">
        <div className="text-dawn-purple mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
        </div>
        <span className="text-sm font-semibold text-dawn-purple bg-dawn-purple/10 py-1 px-3 rounded-full">{t('onboarding.step2')}</span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-night-text mt-4">{t('onboarding.notifications.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">{t('onboarding.notifications.subtitle')}</p>
        
        <div className="space-y-4">
             <button 
                onClick={handleActivateNotifications}
                disabled={isSubscribing}
                className="w-full bg-night-blue text-white dark:bg-gray-200 dark:text-night-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-700 dark:hover:bg-white disabled:bg-gray-400 transition duration-300"
            >
                {isSubscribing ? t('dashboard.notificationBanner.activating') : t('onboarding.notifications.activateButton')}
            </button>
            <button 
                onClick={handleSkipNotifications}
                disabled={isSubscribing}
                className="w-full text-gray-500 dark:text-gray-400 font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/50 transition duration-300"
            >
                {t('onboarding.notifications.skipButton')}
            </button>
        </div>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-night-blue flex flex-col justify-center items-center p-4">
        {step === 1 ? renderStep1() : renderStep2()}
    </div>
  );
}