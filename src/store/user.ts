import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserStore {
  solvedQuizDateList: string[]
  setSolvedQuizDateList: (dateList: string[]) => void
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      solvedQuizDateList: [],
      setSolvedQuizDateList: (dateList) => set({ solvedQuizDateList: dateList }),
    }),
    {
      name: 'quiz-date-list-storage', // localStorage용
      partialize: (state) => ({ ...state, solvedQuizDateList: state.solvedQuizDateList }),
    }
  )
)
