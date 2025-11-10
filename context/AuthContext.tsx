import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Focus, NotificationPreferences, NotificationTone, NotificationLength } from '../types';
import { supabase } from '../supabaseClient';
import { Session, PushSubscription } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<any>;
  updateUserFocus: (focus: Focus) => Promise<void>;
  updateUserProfilePicture: (photoUrl: string) => Promise<void>;
  updateUserName: (name: string) => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  updateUserToPremium: () => Promise<void>;
  updateUserPushSubscription: (subscription: PushSubscription | null) => Promise<void>;
  updateUserNotificationPreferences: (preferences: NotificationPreferences) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
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
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session: Session | null) => {
      setLoading(true);
      if (session) {
        // First, fetch the core profile data.
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('name, focus, photo_url, is_premium, notification_preferences')
          .eq('id', session.user.id)
          .single();

        if (error && error.code === 'PGRST116') { // Profile not found
          console.warn("Profile not found for user, creating one as a fallback.");
          const newProfile = {
            id: session.user.id,
            name: session.user.user_metadata.name || session.user.email,
          };
          const { error: insertError } = await supabase.from('profiles').insert(newProfile);
          
          if (insertError) {
            console.error("Error creating profile on the fly:", insertError);
            setUser(null);
          } else {
            setUser({
              id: session.user.id,
              email: session.user.email,
              name: newProfile.name,
              focus: undefined,
              photoURL: undefined,
              is_premium: false,
              pushSubscription: null,
              notificationPreferences: { tone: 'Amable', length: 'Medio' },
            });
          }
        } else if (error) {
          console.error("Error fetching core profile:", error);
          setUser(null);
        } else {
          // Core profile fetched. Now, try to get the push subscription.
          let pushSub: PushSubscription | null = null;
          const { data: subData, error: subError } = await supabase
              .from('profiles')
              .select('push_subscription')
              .eq('id', session.user.id)
              .single();

          // Ignore the specific error for a missing column. Log other errors.
          if (subError && !subError.message.includes('column "push_subscription" does not exist')) {
            console.error("Error fetching push subscription:", subError);
          } else if (!subError && subData) {
              pushSub = subData.push_subscription as PushSubscription | null;
          }

          setUser({
            id: session.user.id,
            email: session.user.email,
            name: profile?.name,
            focus: profile?.focus as Focus,
            photoURL: profile?.photo_url,
            is_premium: profile?.is_premium,
            pushSubscription: pushSub,
            notificationPreferences: profile?.notification_preferences || { tone: 'Amable', length: 'Medio' },
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    setLoading(false);
    if (error) throw error;
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
        console.error('Error logging in with Google:', error);
        throw error;
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    setLoading(true);
    // The trigger 'on_auth_user_created' will automatically create the profile.
    // No need to manually insert from the client side anymore.
    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          name: name,
        },
      },
    });

    setLoading(false);
    if (error) {
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateUserFocus = async (focus: Focus) => {
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({ focus: focus, updated_at: new Date() })
        .eq('id', user.id);
      
      if (error) {
        console.error("Error updating focus:", error);
      } else {
        setUser({ ...user, focus });
      }
    }
  };
  
  const updateUserNotificationPreferences = async (preferences: NotificationPreferences) => {
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({ notification_preferences: preferences, updated_at: new Date() })
        .eq('id', user.id);
      
      if (error) {
        console.error("Error updating notification preferences:", error);
        throw error;
      } else {
        setUser({ ...user, notificationPreferences: preferences });
      }
    }
  };

  const updateUserPushSubscription = async (subscription: PushSubscription | null) => {
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({ push_subscription: subscription, updated_at: new Date() })
        .eq('id', user.id);
      
      if (error) {
        console.error("Error updating push subscription:", error);
        throw error;
      } else {
        setUser({ ...user, pushSubscription: subscription });
      }
    }
  };

  const updateUserProfilePicture = async (photoUrl: string) => {
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({ photo_url: photoUrl, updated_at: new Date() })
      .eq('id', user.id)
      .select('photo_url');

    if (error) {
      console.error("Error updating profile picture URL:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      throw new Error("Could not confirm profile picture update.");
    }

    setUser(currentUser => currentUser ? { ...currentUser, photoURL: data[0].photo_url } : null);
  };

  const updateUserName = async (name: string) => {
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({ name: name, updated_at: new Date() })
        .eq('id', user.id);
      
      if (error) {
        console.error("Error updating name:", error);
        throw error;
      } else {
        setUser({ ...user, name });
      }
    }
  };
  
  const updateUserToPremium = async () => {
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .update({ is_premium: true, updated_at: new Date() })
        .eq('id', user.id)
        .select('is_premium');
      
      if (error) {
        console.error("Error updating to premium:", error);
        throw error;
      }

      setUser(currentUser => currentUser ? { ...currentUser, is_premium: data?.[0].is_premium } : null);
    }
  };

  const resendConfirmationEmail = async (email: string) => {
    const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
    });
    if (error) throw error;
  };

  const value = {
    user,
    loading,
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
    updateUserNotificationPreferences
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};