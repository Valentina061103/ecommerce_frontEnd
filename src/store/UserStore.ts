import { create } from 'zustand';
import { IUser } from '../types/IUser';

interface UserStore {
    users: IUser[];
    setUsers: (users: IUser[]) => void;
    addUser: (user: IUser) => void;
    updateUser: (user: IUser) => void;
    toggleUserActive: (id: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    updateUser: (user) =>
        set((state) => ({
        users: state.users.map((u) => (u.id === user.id ? user : u)),
        })),
    toggleUserActive: (id) =>
        set((state) => ({
        users: state.users.map((u) =>
            u.id === id ? { ...u, activo: !u.activo } : u
        ),
        })),
}));
