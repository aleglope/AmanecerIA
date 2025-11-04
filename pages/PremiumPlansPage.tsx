
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FeatureListItem } from '../components/premium/FeatureListItem';
import { PricingCard } from '../components/premium/PricingCard';

interface PremiumPlansPageProps {
    onBack: () => void;
}

const PremiumPlansPage: React.FC<PremiumPlansPageProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-night-blue">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 py-12">
                <button onClick={onBack} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-night-blue dark:hover:text-white font-semibold mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Volver al Panel
                </button>
                
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-night-text">Eleva tu Bienestar con Premium</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
                        Transforma tu apoyo matutino en una conversación continua. Profundiza, aprende y crece con herramientas exclusivas diseñadas para ti.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <FeatureListItem
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
                        title="IA Conversacional"
                        description="Dialoga con tu IA para explorar tus pensamientos y recibir apoyo continuo."
                    />
                    <FeatureListItem
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l1.414 1.414M5.222 5.222l1.414 1.414M18.364 5.222l-1.414 1.414M6.636 18.364l-1.414 1.414M12 16a4 4 0 110-8 4 4 0 010 8z" /></svg>}
                        title="Personalización Avanzada"
                        description="La IA aprende de ti y adapta los mensajes futuros a tu progreso personal."
                    />
                    <FeatureListItem
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>}
                        title="Biblioteca de Ejercicios"
                        description="Accede a audios y guías de TCC y Mindfulness para momentos clave del día."
                    />
                    <FeatureListItem
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>}
                        title="Estadísticas de Progreso"
                        description="Visualiza tu evolución emocional con gráficos y patrones detallados."
                    />
                </div>

                <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8">
                    <PricingCard 
                        title="Mensual"
                        price="4.99€"
                        period="/mes"
                        description="Flexibilidad total. Cancela cuando quieras."
                        onSelect={() => alert('Iniciar prueba mensual (simulado)')}
                    />
                    <PricingCard 
                        title="Anual"
                        price="49.99€"
                        period="/año"
                        description="La mejor opción para un compromiso a largo plazo."
                        badge="Ahorra un 15%"
                        isRecommended={true}
                        onSelect={() => alert('Iniciar prueba anual (simulado)')}
                    />
                </div>

                <div className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
                    <p>Puedes cancelar tu suscripción en cualquier momento. Las pruebas gratuitas son solo para nuevos usuarios.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PremiumPlansPage;