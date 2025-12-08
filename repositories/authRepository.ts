import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";
import { AuthError } from "../types/errors";

/**
 * Repository interface for authentication operations
 */
export interface AuthRepository {
  signInWithPassword(
    email: string,
    password: string
  ): Promise<{ session: Session | null; error: Error | null }>;

  signUp(
    email: string,
    password: string,
    metadata: { name: string }
  ): Promise<{ error: Error | null }>;

  signOut(): Promise<void>;

  signInWithOAuth(provider: "google"): Promise<void>;

  resendConfirmationEmail(email: string): Promise<void>;

  onAuthStateChange(
    callback: (event: string, session: Session | null) => void
  ): { unsubscribe: () => void };
}

/**
 * Supabase implementation of AuthRepository
 */
class SupabaseAuthRepository implements AuthRepository {
  async signInWithPassword(
    email: string,
    password: string
  ): Promise<{ session: Session | null; error: Error | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        session: null,
        error: new AuthError(error.message, error.status?.toString()),
      };
    }

    return { session: data.session, error: null };
  }

  async signUp(
    email: string,
    password: string,
    metadata: { name: string }
  ): Promise<{ error: Error | null }> {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });

    if (error) {
      return { error: new AuthError(error.message, error.status?.toString()) };
    }

    return { error: null };
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new AuthError(error.message, error.status?.toString());
    }
  }

  async signInWithOAuth(provider: "google"): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      throw new AuthError(
        `Error logging in with ${provider}: ${error.message}`,
        error.status?.toString()
      );
    }
  }

  async resendConfirmationEmail(email: string): Promise<void> {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      throw new AuthError(error.message, error.status?.toString());
    }
  }

  onAuthStateChange(
    callback: (event: string, session: Session | null) => void
  ): { unsubscribe: () => void } {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(callback);

    return {
      unsubscribe: () => subscription.unsubscribe(),
    };
  }
}

/**
 * Singleton instance of the auth repository
 */
export const authRepository: AuthRepository = new SupabaseAuthRepository();
