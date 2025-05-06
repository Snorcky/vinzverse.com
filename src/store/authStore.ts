import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: any | null;
  session: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updatePassword: (password: string) => Promise<any>;
  updateEmail: (email: string) => Promise<any>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
  
  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      set({
        user: data.user,
        session: data.session,
        isAuthenticated: !!data.user,
      });
      
      return data;
    } catch (error) {
      throw error;
    }
  },
  
  signOut: async () => {
    await supabase.auth.signOut();
    set({
      user: null,
      session: null,
      isAuthenticated: false,
    });
  },
  
  updatePassword: async (password) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },
  
  updateEmail: async (email) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        email,
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },
  
  initialize: async () => {
    set({ isLoading: true });
    
    const { data } = await supabase.auth.getSession();
    set({
      session: data.session,
      user: data.session?.user ?? null,
      isAuthenticated: !!data.session?.user,
      isLoading: false,
    });
    
    // Set up auth state change listener
    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        session,
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
      });
    });
  },
}));