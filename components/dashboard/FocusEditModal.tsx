import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { Focus } from '../../types';
import { FOCUS_OPTIONS } from '../../constants';
import { LoadingSpinner } from '../LoadingSpinner';
import { FocusCard } from '../FocusCard';

interface FocusEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FocusEditModal: React.FC<FocusEditModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { user, updateUserFocus } = useContext(AuthContext);
  const [selectedFocus, setSelectedFocus] = useState<Focus | null>(user?.focus || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedFocus(user?.focus || null);
      setError('');
    }
  }, [isOpen, user?.focus]);

  const handleSave = async () => {
    if (!selectedFocus) return;

    setIsLoading(true);
    setError('');
    try {
      await updateUserFocus(selectedFocus);
      onClose();
    } catch (err) {
      setError(t('focusEditModal.errorGeneric'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-night-text mb-6">
          {t('focusEditModal.title')}
        </h2>
        
        <div className="space-y-3 mb-6">
            {FOCUS_OPTIONS.map(focus => (
                <FocusCard 
                    key={focus} 
                    titleKey={focus}
                    selected={selectedFocus === focus}
                    onClick={() => setSelectedFocus(focus)}
                />
            ))}
        </div>

        {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-3 rounded-r-lg mb-4">
                <p className="text-red-800 dark:text-red-200 text-sm font-semibold text-center">{error}</p>
            </div>
        )}

        <div className="mt-6 flex gap-4">
          <button 
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-night-text font-bold py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
          >
            {t('profileEditModal.cancel')}
          </button>
          <button 
            onClick={handleSave}
            disabled={isLoading || !selectedFocus} 
            className="w-full bg-night-blue hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-white dark:text-night-blue text-white font-bold py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? <LoadingSpinner /> : t('focusEditModal.save')}
          </button>
        </div>
      </div>
    </div>
  );
};