
import React, { useState, useEffect } from 'react';
import { subscribeUserToPush } from '../../utils/notificationUtils';

export const NotificationBanner: React.FC = () => {
    const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if ('Notification' in window) {
            setPermissionStatus(Notification.permission);
            if (Notification.permission === 'default') {
                setIsVisible(true);
            }
        }
    }, []);

    const requestNotificationPermission = async () => {
        if (!('Notification' in window)) {
            console.error("This browser does not support desktop notification");
            return;
        }

        const permission = await Notification.requestPermission();
        setPermissionStatus(permission);

        if (permission === 'granted') {
            await subscribeUserToPush();
            // Hide the banner after a short delay
            setTimeout(() => setIsVisible(false), 3000);
        }
    };

    if (!isVisible) {
        return null;
    }

    const renderContent = () => {
        switch (permissionStatus) {
            case 'granted':
                return (
                    <p className="font-semibold">¡Genial! Las notificaciones están activadas.</p>
                );
            case 'denied':
                return (
                    <div>
                        <p className="font-semibold">Has bloqueado las notificaciones.</p>
                        <p className="text-sm">Para recibirlas, debes activarlas en los ajustes de tu navegador.</p>
                    </div>
                );
            case 'default':
                return (
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                        <div>
                            <p className="font-semibold">Recibe tu mensaje cada mañana</p>
                            <p className="text-sm">Activa las notificaciones para no perderte tu dosis diaria de positividad.</p>
                        </div>
                        <button 
                            onClick={requestNotificationPermission}
                            className="mt-2 sm:mt-0 sm:ml-4 bg-white text-night-blue font-bold py-2 px-5 rounded-full shadow-md hover:bg-gray-100 transition duration-300 shrink-0"
                        >
                            Activar
                        </button>
                    </div>
                );
        }
    };
    
    return (
        <div className="bg-gradient-to-r from-dawn-blue to-dawn-purple text-white p-4 rounded-lg shadow-lg mb-8 flex items-center space-x-4 animate-[fadeIn_0.5s_ease-out]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {renderContent()}
            {permissionStatus !== 'default' && (
                <button onClick={() => setIsVisible(false)} className="absolute top-2 right-2 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};
