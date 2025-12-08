import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { User, Focus, NotificationPreferences } from "../types";
import { Session } from "@supabase/supabase-js";
import { calculateStreak } from "../utils/streakUtils";
import { authRepository } from "../repositories/authRepository";
import { profileRepository } from "../repositories/profileRepository";
import { moodRepository } from "../repositories/moodRepository";
import {
  assertValidEmail,
  assertValidPassword,
  assertNotEmpty,
} from "../utils/validators";
import { DEFAULT_NOTIFICATION_PREFERENCES } from "../constants/supabase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  updateUserFocus: (focus: Focus) => Promise<void>;
  updateUserProfilePicture: (photoUrl: string) => Promise<void>;
  updateUserName: (name: string) => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  updateUserToPremium: () => Promise<void>;
  updateUserPushSubscription: (
    subscription: PushSubscription | null
  ) => Promise<void>;
  updateUserNotificationPreferences: (
    preferences: NotificationPreferences
  ) => Promise<void>;
  streak: number;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  updateUserFocus: async () => {},
  updateUserProfilePicture: async () => {},
  updateUserName: async () => {},
  resendConfirmationEmail: async () => {},
  loginWithGoogle: async () => {},
  updateUserToPremium: async () => {},
  updateUserPushSubscription: async () => {},
  updateUserNotificationPreferences: async () => {},
  streak: 0,
});

/**
 * Builds a default user object from auth user data
 */
function buildDefaultUser(authUser: any): User {
  return {
    id: authUser.id,
    email: authUser.email,
    name: authUser.user_metadata.name || authUser.email,
    focus: undefined,
    photoURL: undefined,
    is_premium: false,
    pushSubscription: null,
    notificationPreferences: DEFAULT_NOTIFICATION_PREFERENCES,
  };
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Loads user profile and streak data
   * Implements race condition prevention with AbortController
   */
  const loadUserProfile = useCallback(async (session: Session) => {
    // Cancel previous request if still running
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      // Fetch profile data
      const profile = await profileRepository.getProfileById(session.user.id);

      // If aborted, don't update state
      if (abortControllerRef.current.signal.aborted) {
        return;
      }

      // Handle profile not found - create default
      if (!profile) {
        console.warn("Profile not found for user, creating one as a fallback.");
        const defaultName =
          session.user.user_metadata.name || session.user.email;
        await profileRepository.createDefaultProfile(
          session.user.id,
          defaultName
        );
        setUser(buildDefaultUser(session.user));
        setStreak(0);
        return;
      }

      // Fetch mood history for streak calculation
      const moodDates = await moodRepository.getMoodHistoryDates(
        session.user.id
      );
      const calculatedStreak = calculateStreak(moodDates);

      // Fetch push subscription separately (may not exist in DB)
      let pushSub: PushSubscription | null = null;
      try {
        pushSub = await profileRepository.getPushSubscription(session.user.id);
      } catch (err) {
        console.warn("Could not fetch push subscription:", err);
      }

      // Check abort again before final state update
      if (abortControllerRef.current.signal.aborted) {
        return;
      }

      setUser({
        id: session.user.id,
        email: session.user.email,
        name: profile.name,
        focus: profile.focus as Focus,
        photoURL: profile.photo_url,
        is_premium: profile.is_premium,
        pushSubscription: pushSub,
        notificationPreferences:
          profile.notification_preferences || DEFAULT_NOTIFICATION_PREFERENCES,
      });
      setStreak(calculatedStreak);
      setError(null);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Error loading profile:", err);
        setError("Failed to load user profile");
        setUser(null);
        setStreak(0);
      }
    }
  }, []);

  /**
   * Subscribe to auth state changes
   */
  useEffect(() => {
    const { unsubscribe } = authRepository.onAuthStateChange(
      async (_event, session: Session | null) => {
        setLoading(true);
        if (session) {
          await loadUserProfile(session);
        } else {
          setUser(null);
          setStreak(0);
          setError(null);
        }
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
      abortControllerRef.current?.abort();
    };
  }, [loadUserProfile]);

  /**
   * Login with email and password
   */
  const login = async (email: string, pass: string): Promise<void> => {
    try {
      assertValidEmail(email);
      assertValidPassword(pass);

      setLoading(true);
      setError(null);

      const { error: authError } = await authRepository.signInWithPassword(
        email,
        pass
      );

      if (authError) {
        setError(authError.message);
        throw authError;
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new user
   */
  const register = async (
    name: string,
    email: string,
    pass: string
  ): Promise<void> => {
    try {
      assertNotEmpty(name, "Name");
      assertValidEmail(email);
      assertValidPassword(pass);

      setLoading(true);
      setError(null);

      const { error: authError } = await authRepository.signUp(email, pass, {
        name,
      });

      if (authError) {
        setError(authError.message);
        throw authError;
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout current user
   */
  const logout = async (): Promise<void> => {
    try {
      await authRepository.signOut();
    } catch (err: any) {
      console.error("Logout error:", err);
      setError(err.message || "Logout failed");
      // Even if server call fails, we continue to clear local state
    } finally {
      setUser(null);
      setStreak(0);
      // We don't clear error here if it was set in catch, but we might want to clear it eventually
      // For now, let's leave it so user sees if something went wrong, though they are logged out.
    }
  };

  /**
   * Login with Google OAuth
   */
  const loginWithGoogle = async (): Promise<void> => {
    try {
      setError(null);
      await authRepository.signInWithOAuth("google");
    } catch (err: any) {
      setError(err.message || "Google login failed");
      throw err;
    }
  };

  /**
   * Resend confirmation email
   */
  const resendConfirmationEmail = async (email: string): Promise<void> => {
    try {
      assertValidEmail(email);
      setError(null);
      await authRepository.resendConfirmationEmail(email);
    } catch (err: any) {
      setError(err.message || "Failed to resend confirmation email");
      throw err;
    }
  };

  /**
   * Update user focus
   */
  const updateUserFocus = async (focus: Focus): Promise<void> => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      setError(null);
      await profileRepository.updateFocus(user.id, focus);
      setUser((prev) => (prev ? { ...prev, focus } : null));
    } catch (err: any) {
      setError(err.message || "Failed to update focus");
      throw err;
    }
  };

  /**
   * Update user notification preferences
   */
  const updateUserNotificationPreferences = async (
    preferences: NotificationPreferences
  ): Promise<void> => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      setError(null);
      await profileRepository.updateNotificationPreferences(
        user.id,
        preferences
      );
      setUser((prev) =>
        prev ? { ...prev, notificationPreferences: preferences } : null
      );
    } catch (err: any) {
      setError(err.message || "Failed to update notification preferences");
      throw err;
    }
  };

  /**
   * Update push subscription
   */
  const updateUserPushSubscription = async (
    subscription: PushSubscription | null
  ): Promise<void> => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      setError(null);
      await profileRepository.updatePushSubscription(user.id, subscription);
      setUser((prev) =>
        prev ? { ...prev, pushSubscription: subscription } : null
      );
    } catch (err: any) {
      setError(err.message || "Failed to update push subscription");
      throw err;
    }
  };

  /**
   * Update profile picture
   */
  const updateUserProfilePicture = async (photoUrl: string): Promise<void> => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      setError(null);
      const updatedPhotoUrl = await profileRepository.updateProfilePicture(
        user.id,
        photoUrl
      );
      setUser((prev) => (prev ? { ...prev, photoURL: updatedPhotoUrl } : null));
    } catch (err: any) {
      setError(err.message || "Failed to update profile picture");
      throw err;
    }
  };

  /**
   * Update user name
   */
  const updateUserName = async (name: string): Promise<void> => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      assertNotEmpty(name, "Name");
      setError(null);
      await profileRepository.updateUserName(user.id, name);
      setUser((prev) => (prev ? { ...prev, name } : null));
    } catch (err: any) {
      setError(err.message || "Failed to update name");
      throw err;
    }
  };

  /**
   * Update user to premium
   */
  const updateUserToPremium = async (): Promise<void> => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      setError(null);
      const isPremium = await profileRepository.updatePremiumStatus(
        user.id,
        true
      );
      setUser((prev) => (prev ? { ...prev, is_premium: isPremium } : null));
    } catch (err: any) {
      setError(err.message || "Failed to upgrade to premium");
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    updateUserFocus,
    updateUserProfilePicture,
    updateUserName,
    resendConfirmationEmail,
    loginWithGoogle,
    updateUserToPremium,
    updateUserPushSubscription,
    updateUserNotificationPreferences,
    streak,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
