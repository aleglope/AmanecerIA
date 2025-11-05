import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { generateDashboardMessage } from '../../services/geminiService';
import { useTranslation } from '../../context/LanguageContext';

interface MessageCardProps {
  onEditFocusClick: () => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({ onEditFocusClick }) => {
  const { t, language } = useTranslation();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMessage = async () => {
      if (!user?.focus) {
        setError(t('dashboard.messageCard.errorNoFocus'));
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError('');
        const translatedFocus = t(`focuses.${user.focus}`);
        const prompt = t('gemini.dashboardPrompt', { focus: translatedFocus });
        const generatedMessage = await generateDashboardMessage(prompt, language);
        setMessage(generatedMessage);
      } catch (err) {
        setError(t('dashboard.messageCard.errorLoading'));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessage();
  }, [user?.focus, language, t]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-dawn-blue rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-dawn-purple rounded-full animate-pulse delay-150"></div>
            <div className="w-3 h-3 bg-dawn-pink rounded-full animate-pulse delay-300"></div>
            <span className="text-gray-500 dark:text-gray-400">{t('dashboard.messageCard.loading')}</span>
        </div>
      );
    }
    if (error) {
      return <p className="text-red-500">{error}</p>;
    }
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-dawn-purple uppercase tracking-wider">
                  {t('dashboard.messageCard.yourFocus')}: {user?.focus ? t(`focuses.${user.focus}`) : ''}
              </h3>
              <button 
                  onClick={onEditFocusClick}
                  className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors p-1 rounded-full"
                  aria-label={t('dashboard.messageCard.editFocusAriaLabel')}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                  </svg>
              </button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-lg">{message}</p>
        </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 min-h-[200px] flex flex-col justify-center">
      <h2 className="text-xl font-bold text-gray-800 dark:text-night-text mb-4">{t('dashboard.messageCard.title')}</h2>
      {renderContent()}
    </div>
  );
};