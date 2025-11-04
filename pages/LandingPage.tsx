
import React, { useState, useRef } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Problem } from '../components/Problem';
import { Solution } from '../components/Solution';
import { Features } from '../components/Features';
import { Premium } from '../components/Premium';
import { Safety } from '../components/Safety';
import { Cta } from '../components/Cta';
import { Footer } from '../components/Footer';
import { AuthModal } from '../components/AuthModal';

export default function LandingPage() {
  const interactionRef = useRef<HTMLDivElement>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'register'>('register');

  const scrollToInteraction = () => {
    interactionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenLogin = () => {
    setAuthModalView('login');
    setIsAuthModalOpen(true);
  };
  
  const handleOpenRegister = () => {
    setAuthModalView('register');
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-night-blue">
      <Header onLoginClick={handleOpenLogin} onRegisterClick={handleOpenRegister} />
      <main>
        <Hero onCtaClick={scrollToInteraction} />
        <Problem />
        <Solution ref={interactionRef} />
        <Features />
        <Premium />
        <Safety />
        <Cta onCtaClick={handleOpenRegister} />
      </main>
      <Footer />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultView={authModalView}
      />
    </div>
  );
}