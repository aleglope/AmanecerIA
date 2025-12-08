import React from "react";
import { useTranslation } from "../context/LanguageContext";

interface PremiumProps {
  onCtaClick?: () => void;
}

export const Premium: React.FC<PremiumProps> = ({ onCtaClick }) => {
  const { t } = useTranslation();
  return (
    <section
      id="premium"
      className="py-20 bg-gradient-to-tr from-dawn-blue to-dawn-purple dark:from-night-blue dark:to-gray-800 text-white"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {t("landing.premium.title")}
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          {t("landing.premium.subtitle")}
        </p>
        <button
          onClick={onCtaClick}
          className="bg-white text-night-blue font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition duration-300 transform hover:scale-105"
        >
          {t("landing.premium.cta")}
        </button>
      </div>
    </section>
  );
};
