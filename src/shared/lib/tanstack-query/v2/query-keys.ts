import { api } from '@/actions/fetchers'
import { getWeekQuizAnswerRate } from '@/actions/fetchers/quiz'
import { SORT_OPTION } from '@/constants'
import { createQueryKeyStore } from '@lukemorales/query-key-factory'

export const queries = createQueryKeyStore({
  category: {
    list: () => ({
      queryKey: [''],
      queryFn: () => api.category.getCategories(),
    }),
    item: (categoryId: number) => ({
      queryKey: [categoryId],
      queryFn: () =>
        api.category.getCategory({
          categoryId,
        }),
    }),
  },

  document: {
    item: (documentId: number) => ({
      queryKey: [documentId],
      queryFn: () =>
        api.document.getDocument({
          documentId,
        }),
      retry: false,
    }),
    list: (categoryId: number, sortOption: (typeof SORT_OPTION)[number]) => ({
      queryKey: [categoryId, sortOption],
      queryFn: () =>
        api.document.getDocumentsForCategory({
          categoryId,
          sortOption,
        }),
    }),
    topFive: () => ({
      queryKey: [''],
      queryFn: () => api.document.getTopFive().then((res) => res.documents),
    }),
    search: (term: string | null) => ({
      queryKey: [''],
      queryFn: () => api.document.searchDocument({ term: term! }),
      enabled: term != null,
    }),
  },

  keyPoints: {
    list: () => ({
      queryKey: [''],
      queryFn: () => api.keyPoint.getBookmarks().then((res) => res.keyPoints),
    }),
    item: (documentId: number) => ({
      queryKey: [documentId],
      queryFn: () =>
        api.keyPoint.getKeyPointsById({
          documentId,
        }),
    }),
    search: (term: string) => ({
      queryKey: [term],
      queryFn: () =>
        api.keyPoint.searchKeyPoints({
          term,
        }),
    }),
  },

  quiz: {
    today: () => ({
      queryKey: [''],
      queryFn: () => api.quiz.getTodayQuizSetId(),
    }),
    weekAnswerRate: (categoryId: number) => ({
      queryKey: [categoryId],
      queryFn: () =>
        getWeekQuizAnswerRate({
          categoryId,
        }),
    }),
    monthAnswerRate: ({
      categoryId,
      date,
    }: {
      categoryId: number
      date: {
        year: number
        month: number
      }
    }) => ({
      queryKey: [categoryId, date],
      queryFn: () =>
        api.quiz.getMonthQuizAnswerRate({
          categoryId,
          date,
        }),
    }),
  },
})
