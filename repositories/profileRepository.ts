import { supabase } from "../supabaseClient";
import { User, Focus, NotificationPreferences } from "../types";
import { PushSubscription } from "@supabase/supabase-js";
import { ProfileError, RepositoryError } from "../types/errors";
import { SUPABASE_ERRORS } from "../constants/supabase";

/**
 * Profile data returned from database
 */
export interface ProfileData {
  name?: string;
  focus?: Focus;
  photo_url?: string;
  is_premium?: boolean;
  notification_preferences?: NotificationPreferences;
  push_subscription?: PushSubscription | null;
}

/**
 * Repository interface for profile operations
 */
export interface ProfileRepository {
  getProfileById(userId: string): Promise<ProfileData | null>;

  createDefaultProfile(userId: string, name: string): Promise<void>;

  updateFocus(userId: string, focus: Focus): Promise<void>;

  updateNotificationPreferences(
    userId: string,
    preferences: NotificationPreferences
  ): Promise<void>;

  updateProfilePicture(userId: string, photoUrl: string): Promise<string>;

  updateUserName(userId: string, name: string): Promise<void>;

  updatePremiumStatus(userId: string, isPremium: boolean): Promise<boolean>;

  updatePushSubscription(
    userId: string,
    subscription: PushSubscription | null
  ): Promise<void>;

  getPushSubscription(userId: string): Promise<PushSubscription | null>;
}

/**
 * Supabase implementation of ProfileRepository
 */
class SupabaseProfileRepository implements ProfileRepository {
  async getProfileById(userId: string): Promise<ProfileData | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("name, focus, photo_url, is_premium, notification_preferences")
      .eq("id", userId)
      .single();

    if (error) {
      if (error.code === SUPABASE_ERRORS.PROFILE_NOT_FOUND) {
        return null; // Profile not found, let caller handle creation
      }
      throw new RepositoryError(
        `Failed to fetch profile: ${error.message}`,
        error.code
      );
    }

    return data;
  }

  async createDefaultProfile(userId: string, name: string): Promise<void> {
    const { error } = await supabase.from("profiles").insert({
      id: userId,
      name,
    });

    if (error) {
      throw new ProfileError(
        `Failed to create profile: ${error.message}`,
        error.code
      );
    }
  }

  async updateFocus(userId: string, focus: Focus): Promise<void> {
    const { error } = await supabase
      .from("profiles")
      .update({ focus, updated_at: new Date() })
      .eq("id", userId);

    if (error) {
      throw new ProfileError(
        `Failed to update focus: ${error.message}`,
        error.code
      );
    }
  }

  async updateNotificationPreferences(
    userId: string,
    preferences: NotificationPreferences
  ): Promise<void> {
    const { error } = await supabase
      .from("profiles")
      .update({
        notification_preferences: preferences,
        updated_at: new Date(),
      })
      .eq("id", userId);

    if (error) {
      throw new ProfileError(
        `Failed to update notification preferences: ${error.message}`,
        error.code
      );
    }
  }

  async updateProfilePicture(
    userId: string,
    photoUrl: string
  ): Promise<string> {
    const { data, error } = await supabase
      .from("profiles")
      .update({ photo_url: photoUrl, updated_at: new Date() })
      .eq("id", userId)
      .select("photo_url");

    if (error || !data || data.length === 0) {
      throw new ProfileError("Failed to update profile picture", error?.code);
    }

    return data[0].photo_url;
  }

  async updateUserName(userId: string, name: string): Promise<void> {
    const { error } = await supabase
      .from("profiles")
      .update({ name, updated_at: new Date() })
      .eq("id", userId);

    if (error) {
      throw new ProfileError(
        `Failed to update name: ${error.message}`,
        error.code
      );
    }
  }

  async updatePremiumStatus(
    userId: string,
    isPremium: boolean
  ): Promise<boolean> {
    const { data, error } = await supabase
      .from("profiles")
      .update({ is_premium: isPremium, updated_at: new Date() })
      .eq("id", userId)
      .select("is_premium");

    if (error) {
      throw new ProfileError(
        `Failed to update premium status: ${error.message}`,
        error.code
      );
    }

    return data?.[0]?.is_premium ?? false;
  }

  async updatePushSubscription(
    userId: string,
    subscription: PushSubscription | null
  ): Promise<void> {
    const { error } = await supabase
      .from("profiles")
      .update({ push_subscription: subscription, updated_at: new Date() })
      .eq("id", userId);

    if (error) {
      throw new ProfileError(
        `Failed to update push subscription: ${error.message}`,
        error.code
      );
    }
  }

  async getPushSubscription(userId: string): Promise<PushSubscription | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("push_subscription")
      .eq("id", userId)
      .single();

    // Ignore error if column doesn't exist (backward compatibility)
    if (
      error &&
      !error.message.includes('column "push_subscription" does not exist')
    ) {
      console.error("Error fetching push subscription:", error);
    }

    return (data?.push_subscription as PushSubscription | null) ?? null;
  }
}

/**
 * Singleton instance of the profile repository
 */
export const profileRepository: ProfileRepository =
  new SupabaseProfileRepository();
