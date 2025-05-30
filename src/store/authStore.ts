import { create } from 'zustand';
import { IUser } from '../types/IUser';

interface AuthStore {
  user: Partial<IUser> | null; //solo guarda algunos datos
  token: string;
  setUser: (user: Partial<IUser>) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: '',
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: '' }),
}));
