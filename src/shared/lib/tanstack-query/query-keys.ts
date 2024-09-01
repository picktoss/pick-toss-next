import { api } from '@/actions/fetchers'
import { SORT_OPTION } from '@/constants/document'
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
  },
})
