import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: { name: string; email: string } | null
  login: (user: { name: string; email: string }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'auth-storage' }
  )
)
