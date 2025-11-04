
import React from 'react';
import { useTranslation } from '../context/LanguageContext';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-red-700 mb-4">{t('crisisModal.title')}</h2>
        <p className="text-gray-700 mb-6">
          {t('crisisModal.text')}
        </p>
        <div className="space-y-3">
          <a href="tel:911" className="block w-full text-center bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition">
            {t('crisisModal.callButton')}
          </a>
          <a href="#" className="block w-full text-center bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition">
            {t('crisisModal.helpLinesButton')}
          </a>
        </div>
        <button onClick={onClose} className="mt-6 w-full text-gray-600 hover:text-gray-800 transition">
          {t('crisisModal.closeButton')}
        </button>
      </div>
    </div>
  );
};