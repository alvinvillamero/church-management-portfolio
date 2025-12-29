import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  role: 'MASTER_ADMIN' | 'CAREGROUP_LEADER' | 'REGULAR_USER';
  email?: string;
  member?: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  refreshToken: typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  login: (token, refreshToken, user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
    }
    set({
      token,
      refreshToken,
      user,
      isAuthenticated: true,
    });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
    set({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
  },
  updateUser: (user) =>
    set((state) => {
      const updatedUser = state.user ? { ...state.user, ...user } : user;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      return { user: updatedUser };
    }),
}));

