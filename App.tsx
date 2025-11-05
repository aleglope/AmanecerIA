
import React, { useContext, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { AuthContext } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';

function App() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
          .then(registration => {
            console.log('ServiceWorker registration successful:', registration);
          })
          .catch(err => {
            console.error('ServiceWorker registration failed:', err);
          });
      });
    }
  }, []);

  if (!user) {
    return <LandingPage />;
  }

  if (!user.focus) {
    return <Onboarding />;
  }

  return <Dashboard />;
}

export default App;