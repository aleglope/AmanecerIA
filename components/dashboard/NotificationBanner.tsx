
import React, { useState, useEffect, useContext } from 'react';
import { subscribeUserToPush } from '../../utils/notificationUtils';
import { useTranslation } from '../../context/LanguageContext';
import { AuthContext } from '../../context/AuthContext';

export const NotificationBanner: React.FC = () => {
    const { t } = useTranslation();
    const { user, updateUserPushSubscription } = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(false);
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const isSubscribed = !!user?.pushSubscription;
        if ('Notification' in window && 'serviceWorker' in navigator && user && !isSubscribed) {
            const currentPermission = Notification.permission;
            if (currentPermission !== 'denied') {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        } else {
            setIsVisible(false);
        }
    }, [user]);

    const requestNotificationPermission = async () => {
        if (!('Notification' in window)) {
            console.error("This browser does not support desktop notification");
            return;
        }

        setIsSubscribing(true);
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            await subscribeUserToPush(async (subscription) => {
                await updateUserPushSubscription(subscription);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsVisible(false);
                }, 3000);
            });
        }
        setIsSubscribing(false);
    };

    if (!isVisible) {
        return null;
    }

    const renderContent = () => {
        if (isSuccess) {
            return <p className="font-semibold">{t('dashboard.notificationBanner.granted')}</p>;
        }
        
        const permission = Notification.permission;
        
        if (permission === 'denied') {
            // This case should not be reached due to the useEffect logic, but as a fallback
            return (
                 <div>
                    <p className="font-semibold">{t('dashboard.notificationBanner.deniedTitle')}</p>
                    <p className="text-sm">{t('dashboard.notificationBanner.deniedSubtitle')}</p>
                </div>
            );
        }

        return (
            <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                <div>
                    <p className="font-semibold">{t('dashboard.notificationBanner.title')}</p>
                    <p className="text-sm">{t('dashboard.notificationBanner.subtitle')}</p>
                </div>
                <button 
                    onClick={requestNotificationPermission}
                    disabled={isSubscribing}
                    className="mt-2 sm:mt-0 sm:ml-4 bg-white text-night-blue font-bold py-2 px-5 rounded-full shadow-md hover:bg-gray-100 transition duration-300 shrink-0 disabled:opacity-75"
                >
                    {isSubscribing ? t('dashboard.notificationBanner.activating') : t('dashboard.notificationBanner.button')}
                </button>
            </div>
        );
    };
    
    return (
        <div className="bg-gradient-to-r from-dawn-blue to-dawn-purple text-white p-4 rounded-lg shadow-lg mb-8 flex items-center space-x-4 animate-[fadeIn_0.5s_ease-out]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {renderContent()}
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};