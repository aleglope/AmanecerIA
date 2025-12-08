import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FeatureListItem } from "../components/premium/FeatureListItem";
import { PricingCard } from "../components/premium/PricingCard";
import { useTranslation } from "../context/LanguageContext";
import { subscriptionRepository } from "../repositories/subscriptionRepository";
import { STRIPE_CONFIG } from "../constants/stripe";

interface PremiumPlansPageProps {
  onBack: () => void;
}

const PremiumPlansPage: React.FC<PremiumPlansPageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  const handleSelectPlan = async (planType: "monthly" | "yearly") => {
    setIsUpdating(true);
    setError("");
    try {
      const priceId =
        planType === "monthly"
          ? STRIPE_CONFIG.PLANS.MONTHLY.ID
          : STRIPE_CONFIG.PLANS.YEARLY.ID;

      const url = await subscriptionRepository.createCheckoutSession(priceId);

      // Redirect to Stripe
      window.location.href = url;
    } catch (err: any) {
      setError(t("premiumPage.updateError") + " " + (err.message || ""));
      console.error(err);
      setIsUpdating(false); // Only stop loading if we failed to redirect
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-night-blue">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-night-blue dark:hover:text-white font-semibold mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {t("premiumPage.backButton")}
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-night-text">
            {t("premiumPage.title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
            {t("premiumPage.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureListItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            }
            title={t("premiumPage.features.one.title")}
            description={t("premiumPage.features.one.description")}
          />
          <FeatureListItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l1.414 1.414M5.222 5.222l1.414 1.414M18.364 5.222l-1.414 1.414M6.636 18.364l-1.414 1.414M12 16a4 4 0 110-8 4 4 0 010 8z"
                />
              </svg>
            }
            title={t("premiumPage.features.two.title")}
            description={t("premiumPage.features.two.description")}
          />
          <FeatureListItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
                />
              </svg>
            }
            title={t("premiumPage.features.three.title")}
            description={t("premiumPage.features.three.description")}
          />
          <FeatureListItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            }
            title={t("premiumPage.features.four.title")}
            description={t("premiumPage.features.four.description")}
          />
        </div>

        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8">
          <PricingCard
            title={t("premiumPage.pricing.monthly.title")}
            price="4.99€"
            period={t("premiumPage.pricing.monthly.period")}
            description={t("premiumPage.pricing.monthly.description")}
            onSelect={() => handleSelectPlan("monthly")}
            isLoading={isUpdating}
          />
          <PricingCard
            title={t("premiumPage.pricing.yearly.title")}
            price="49.99€"
            period={t("premiumPage.pricing.yearly.period")}
            description={t("premiumPage.pricing.yearly.description")}
            badge={t("premiumPage.pricing.yearly.badge")}
            isRecommended={true}
            onSelect={() => handleSelectPlan("yearly")}
            isLoading={isUpdating}
          />
        </div>

        {error && <p className="text-center text-red-500 mt-8">{error}</p>}

        <div className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
          <p>{t("premiumPage.disclaimer")}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PremiumPlansPage;
