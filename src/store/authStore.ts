import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (username: string) => set({ isAuthenticated: true, user: username }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
