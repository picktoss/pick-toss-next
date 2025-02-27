import { LOCAL_KEY } from '@/constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 추가로 user 관련 데이터를 저장할 수 있음
type UserInfo = User.Info & {
  //
}

interface UserStore {
  userInfo: UserInfo | undefined
  setUserInfo: (userInfo: UserInfo) => void
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userInfo: null as unknown as UserInfo,
      setUserInfo: (userInfo) => set({ userInfo: userInfo }),
    }),
    {
      name: LOCAL_KEY.USER_STORAGE, // localStorage용
      // partialize: (state) => ({ ...state, userInfo: state.userInfo }),
    }
  )
)
