import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserStore {
  userInfo: User.Info | undefined
  setUserInfo: (userInfo: User.Info) => void
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userInfo: null as unknown as User.Info,
      setUserInfo: (userInfo) => set({ userInfo: userInfo }),
    }),
    {
      name: 'user-storage', // localStorage용
      partialize: (state) => ({ ...state, userInfo: state.userInfo }),
    }
  )
)
