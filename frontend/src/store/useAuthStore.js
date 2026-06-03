import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Persisted state for authentication
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, 
      isAuthenticated: false,
      isAdmin: false,
      login: (email, password, asAdmin = false) => {
        // In a real app, this would be an API call.
        // Simulating login:
        if (asAdmin || email === 'admin@savora.com') {
          set({ 
            user: { id: 'admin1', name: 'Restaurant Admin', email, role: 'admin' }, 
            isAuthenticated: true, 
            isAdmin: true 
          });
        } else {
          set({ 
            user: { id: 'user1', name: 'John Doe', email, role: 'customer', mobile: '9876543210' }, 
            isAuthenticated: true, 
            isAdmin: false 
          });
        }
      },
      signup: (userData) => {
        set({
          user: { id: `user${Date.now()}`, ...userData, role: 'customer' },
          isAuthenticated: true,
          isAdmin: false
        });
      },
      logout: () => set({ user: null, isAuthenticated: false, isAdmin: false }),
      updateProfile: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      }))
    }),
    {
      name: 'savora-auth',
    }
  )
);

