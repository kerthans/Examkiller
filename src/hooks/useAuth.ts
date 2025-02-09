/* eslint-disable @typescript-eslint/no-unused-vars */
// src/hooks/useAuth.ts
import { create } from 'zustand';
import { AuthResponse } from '@/types/auth';
import { loginUser, registerUser } from '@/lib/auth';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: typeof window !== 'undefined' && !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (username: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await loginUser({ username, password });
      localStorage.setItem('token', response.access_token);
      set({ token: response.access_token, isAuthenticated: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : '登录失败，请稍后重试';
      set({ error: message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (username: string, email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await registerUser({ username, email, password });
      localStorage.setItem('token', response.access_token);
      set({ token: response.access_token, isAuthenticated: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : '注册失败，请稍后重试';
      set({ error: message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, isAuthenticated: false });
  },

  clearError: () => set({ error: null })
}));