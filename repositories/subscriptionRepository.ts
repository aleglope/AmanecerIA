import { supabase } from "../supabaseClient";
import { RepositoryError } from "../types/errors";
import { STRIPE_CONFIG } from "../constants/stripe";

export interface CheckoutSessionFileResponse {
  sessionId: string;
  url: string;
}

export interface SubscriptionRepository {
  createCheckoutSession(priceId: string): Promise<string>;
}

class SupabaseSubscriptionRepository implements SubscriptionRepository {
  async createCheckoutSession(priceId: string): Promise<string> {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("User not authenticated");

    const returnUrl = window.location.origin;

    const { data, error } = await supabase.functions.invoke(
      "create-checkout-session",
      {
        body: {
          priceId,
          returnUrl,
        },
      }
    );

    if (error) {
      console.error("Stripe Function Error:", error);
      throw new RepositoryError(
        `Checkout creation failed: ${error.message}`,
        "STRIPE_ERROR"
      );
    }

    if (!data?.url) {
      throw new RepositoryError("No checkout URL returned", "STRIPE_ERROR");
    }

    return data.url;
  }
}

export const subscriptionRepository: SubscriptionRepository =
  new SupabaseSubscriptionRepository();
