import { api } from '@/actions/fetchers'
import { SORT_OPTION } from '@/actions/fetchers/document/get-documents-for-category/query'
import { createQueryKeyStore } from '@lukemorales/query-key-factory'

export const queries = createQueryKeyStore({
  category: {
    list: () => ({
      queryKey: [''],
      queryFn: () => api.category.getCategories(),
    }),
    item: (categoryId: number) => ({
      queryKey: [categoryId],
    }),
  },

  document: {
    item: (documentId: number) => ({
      queryKey: [documentId],
    }),
    list: (categoryId: number, sortOption: (typeof SORT_OPTION)[number]) => ({
      queryKey: [categoryId, sortOption],
    }),
  },
})
