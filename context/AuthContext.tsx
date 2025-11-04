import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Focus } from '../types';
import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<any>;
  updateUserFocus: (focus: Focus) => Promise<void>;
  updateUserProfilePicture: (photoUrl: string) => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  updateUserFocus: async () => {},
  updateUserProfilePicture: async () => {},
  resendConfirmationEmail: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session: Session | null) => {
      setLoading(true);
      if (session) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('name, focus, photo_url')
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
            });
          }
        } else if (error) {
          console.error("Error fetching profile:", error);
          setUser(null);
        } else {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: profile?.name,
            focus: profile?.focus as Focus,
            photoURL: profile?.photo_url,
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

  const updateUserProfilePicture = async (photoUrl: string) => {
    if (!user) {
      throw new Error("Usuario no autenticado.");
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({ photo_url: photoUrl, updated_at: new Date() })
      .eq('id', user.id)
      .select('photo_url');

    if (error) {
      console.error("Error updating profile picture URL:", error);
      throw new Error("No se pudo actualizar la foto de perfil.");
    }

    if (!data || data.length === 0) {
      throw new Error("No se pudo confirmar la actualización de la foto de perfil.");
    }

    setUser(currentUser => currentUser ? { ...currentUser, photoURL: data[0].photo_url } : null);
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
    resendConfirmationEmail,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};