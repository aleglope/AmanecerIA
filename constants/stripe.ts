export const STRIPE_CONFIG = {
  SEARCH_PARAM_PAYMENT: "payment",
  STATUS_SUCCESS: "success",
  STATUS_CANCELLED: "cancelled",
  PLANS: {
    MONTHLY: {
      ID: "price_monthly_placeholder", // REPLACE WITH REAL STRIPE PRICE ID
      PRICE: "4.99€",
    },
    YEARLY: {
      ID: "price_yearly_placeholder", // REPLACE WITH REAL STRIPE PRICE ID
      PRICE: "49.99€",
    },
  },
};
