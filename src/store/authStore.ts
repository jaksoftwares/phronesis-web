import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  role: string | null;
  isAuthenticated: boolean;
  
  setAuth: (user: User, accessToken: string) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      role: null,
      isAuthenticated: false,

      setAuth: (user, accessToken) =>
        set({
          user,
          accessToken,
          role: user.roles?.[0] || null, // Assuming first role is primary for now
          isAuthenticated: true,
        }),

      setAccessToken: (token) =>
        set({
          accessToken: token,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          role: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      // Only persist necessary fields
      partialize: (state) => ({ 
        user: state.user,
        accessToken: state.accessToken,
        role: state.role,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);
