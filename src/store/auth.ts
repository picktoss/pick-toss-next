import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  accessToken: string | null
  setAccessToken: (token: string | null) => void
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: 'auth-storage', // localStorage용
      partialize: (state) => ({ ...state, accessToken: state.accessToken }),
    }
  )
)
