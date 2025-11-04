
import React, { useState, useCallback, forwardRef } from 'react';
import { Mood } from '../types';
import { MOOD_OPTIONS, CRISIS_KEYWORDS } from '../constants';
import { generateMorningMessage } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import { CrisisModal } from './CrisisModal';
import { MessageDisplay } from './MessageDisplay';
import { MoodSelector } from './MoodSelector';
import { useTranslation } from '../context/LanguageContext';

export const Solution = forwardRef<HTMLDivElement>((props, ref) => {
  const { language, t } = useTranslation();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [context, setContext] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  const handleGetMessage = useCallback(async () => {
    if (!selectedMood) {
      setError(t('landing.solution.errorSelectMood'));
      return;
    }

    const lowerCaseContext = context.toLowerCase();
    const crisisWordFound = CRISIS_KEYWORDS[language].some(word => lowerCaseContext.includes(word));

    if (crisisWordFound) {
      setShowCrisisModal(true);
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const translatedMood = t(`moods.${selectedMood}`);
      const prompt = t('gemini.morningPrompt', { mood: translatedMood, context });
      const generatedMessage = await generateMorningMessage(prompt, language);
      setMessage(generatedMessage);
    } catch (err) {
      setError(t('landing.solution.errorGenerating'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedMood, context, language, t]);

  return (
    <section id="solution" className="py-20 bg-white dark:bg-night-blue" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-night-text mb-4">
                {t('landing.solution.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto md:mx-0">
                {t('landing.solution.subtitle')}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative mx-auto border-gray-800 dark:border-gray-600 bg-gray-800 dark:bg-gray-600 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                  <div className="w-[148px] h-[18px] bg-gray-800 dark:bg-gray-600 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                  <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-600 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                  <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-600 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                  <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-600 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                  <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 h-full flex flex-col justify-center">
                        <div className="text-xs font-bold text-dawn-purple mb-2">{t('landing.solution.phone.iaMessage')}</div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t('landing.solution.phone.message')}</p>
                      </div>
                  </div>
              </div>
            </div>
        </div>
        
        <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-night-text mb-2 text-center">{t('landing.solution.tryit.title')}</h3>
            <MoodSelector
              moodOptions={MOOD_OPTIONS}
              selectedMood={selectedMood}
              onSelectMood={setSelectedMood}
            />
            
            <div className="mt-6">
              <label htmlFor="context" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                {t('landing.solution.tryit.contextLabel')}
              </label>
              <textarea
                id="context"
                rows={2}
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder={t('landing.solution.tryit.contextPlaceholder')}
                className="w-full px-3 py-2 text-gray-700 dark:text-night-text bg-white dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dawn-blue transition border-gray-300 dark:border-gray-600"
              ></textarea>
            </div>
            
            <div className="mt-6 text-center">
              <button
                onClick={handleGetMessage}
                disabled={isLoading || !selectedMood}
                className="w-full md:w-auto bg-night-blue text-white dark:bg-gray-200 dark:text-night-blue font-bold py-3 px-10 rounded-full hover:bg-gray-700 dark:hover:bg-white disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 flex items-center justify-center mx-auto"
              >
                {isLoading ? <LoadingSpinner /> : t('landing.solution.tryit.button')}
              </button>
            </div>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            
            <MessageDisplay isLoading={isLoading} message={message} />
        </div>
      </div>
      <CrisisModal isOpen={showCrisisModal} onClose={() => setShowCrisisModal(false)} />
    </section>
  );
});