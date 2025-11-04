
import React, { useState, useEffect } from 'react';

interface MessageDisplayProps {
  isLoading: boolean;
  message: string;
}

const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    if (text) {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i > text.length) {
          clearInterval(intervalId);
        }
      }, 25);
      return () => clearInterval(intervalId);
    }
  }, [text]);

  return <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{displayedText}</p>;
};

export const MessageDisplay: React.FC<MessageDisplayProps> = ({ isLoading, message }) => {
  if (isLoading) {
    return (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[100px] flex items-center justify-center">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-dawn-blue rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-dawn-purple rounded-full animate-pulse delay-150"></div>
                <div className="w-3 h-3 bg-dawn-pink rounded-full animate-pulse delay-300"></div>
            </div>
        </div>
    );
  }

  if (!message) {
     return (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg min-h-[100px] flex flex-col items-center justify-center text-center">
            <p className="text-gray-500 dark:text-gray-400 font-semibold">Tu mensaje aparecerá aquí</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">"No tienes que escalar toda la montaña, solo dar el siguiente paso."</p>
        </div>
    );
  }

  return (
    <div className="mt-6 p-6 bg-gradient-to-r from-dawn-blue/20 to-dawn-pink/20 dark:from-dawn-blue/10 dark:to-dawn-pink/10 rounded-lg min-h-[100px] border-l-4 border-dawn-purple">
        <TypingEffect text={message} />
    </div>
  );
};