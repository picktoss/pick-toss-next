import { LOCAL_KEY } from '@/constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 추가로 auth관련 데이터를 저장할 수 있음

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
      name: LOCAL_KEY.AUTH_STORAGE, // localStorage용
      // partialize: (state) => ({ ...state, accessToken: state.accessToken }),
    }
  )
)
