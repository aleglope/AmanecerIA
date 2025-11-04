import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Avatar } from './Avatar';

interface HeaderProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick, onRegisterClick }) => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-night-blue/80 backdrop-blur-md sticky top-0 z-50 shadow-sm dark:border-b dark:border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800 dark:text-night-text flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-dawn-orange" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.343l3.93 3.93a1 1 0 01-1.414 1.414L10 6.414l-3.515 3.515a1 1 0 01-1.414-1.414L9 4.343V3a1 1 0 011-1zM4.03 8.014L5.445 9.43a1 1 0 11-1.414 1.414l-1.415-1.414a1 1 0 011.414-1.414zM16.383 9.844a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.414 0zM10 18a1 1 0 01-1-1v-1.343l-3.93-3.93a1 1 0 111.414-1.414L10 13.586l3.515-3.515a1 1 0 111.414 1.414L11 15.657V17a1 1 0 01-1 1z" clipRule="evenodd" />
            </svg>
            AmanecerIA
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
            </button>
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <Avatar size="sm" />
                    <span className="text-gray-600 dark:text-gray-300 hidden sm:inline font-semibold">{user.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="bg-dawn-pink/80 text-night-blue font-semibold py-2 px-4 rounded-full hover:bg-dawn-pink transition duration-300 text-sm"
                >
                  Salir
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={onLoginClick}
                  className="font-semibold text-gray-600 dark:text-gray-300 hover:text-night-blue dark:hover:text-white transition duration-300"
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={onRegisterClick}
                  className="bg-night-blue text-white font-bold py-2 px-4 rounded-full hover:bg-gray-700 dark:bg-gray-200 dark:text-night-blue dark:hover:bg-white transition duration-300"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};