import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Avatar } from './Avatar';
import { useTranslation } from '../context/LanguageContext';
import { AmanecerIALogo } from './AmanecerIALogo';

interface HeaderProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onSettingsClick?: () => void;
}

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useTranslation();

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="p-2 w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 font-semibold text-sm"
        >
            {language.toUpperCase()}
        </button>
    );
};

// FIX: Corrected a typo from `React.facerender.FC` to `React.FC` to resolve the TypeScript namespace error.
export const Header: React.FC<HeaderProps> = ({ onLoginClick, onRegisterClick, onSettingsClick }) => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <header className="bg-white/80 dark:bg-night-blue/80 backdrop-blur-md sticky top-0 z-50 shadow-sm dark:border-b dark:border-gray-700">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
             <AmanecerIALogo size="h-12" />
          </div>
          <div className="flex items-center space-x-1 md:space-x-2">
            <LanguageSwitcher />
            <button onClick={toggleTheme} className="p-2 w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
            </button>
            {user ? (
              <div className="flex items-center space-x-2">
                <button onClick={onSettingsClick} className="p-2 w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="flex items-center space-x-2">
                    <Avatar size="sm" />
                    <span className="text-gray-600 dark:text-gray-300 hidden sm:inline font-semibold">{user.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="bg-dawn-pink/80 text-night-blue font-semibold py-2 px-4 rounded-full hover:bg-dawn-pink transition duration-300 text-sm"
                >
                  {t('header.logout')}
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={onLoginClick}
                  className="font-semibold text-gray-600 dark:text-gray-300 hover:text-night-blue dark:hover:text-white transition duration-300"
                >
                  {t('header.login')}
                </button>
                <button 
                  onClick={onRegisterClick}
                  className="bg-night-blue text-white font-bold py-2 px-4 rounded-full hover:bg-gray-700 dark:bg-gray-200 dark:text-night-blue dark:hover:bg-white transition duration-300"
                >
                  {t('header.register')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};