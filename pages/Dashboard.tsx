
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { MessageCard } from '../components/dashboard/MessageCard';
import { MoodTracker } from '../components/dashboard/MoodTracker';
import { PremiumPlaceholder } from '../components/dashboard/PremiumPlaceholder';
import PremiumPlansPage from './PremiumPlansPage';
import { ProfileHeader } from '../components/dashboard/ProfileHeader';
import { NotificationBanner } from '../components/dashboard/NotificationBanner';

export default function Dashboard() {
    const [view, setView] = useState<'dashboard' | 'premium'>('dashboard');

    if (view === 'premium') {
        return <PremiumPlansPage onBack={() => setView('dashboard')} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-night-blue">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 py-8">
                <ProfileHeader />
                <NotificationBanner />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <MessageCard />
                    </div>
                    <div className="lg:col-span-1 space-y-8">
                        <MoodTracker />
                        <PremiumPlaceholder onClick={() => setView('premium')} />
                    </div>
                </div>
            </main>
        </div>
    );
}
