import { REQUEST } from '@/requests'
import { createQueryKeyStore } from '@lukemorales/query-key-factory'

export const queries = createQueryKeyStore({
  directory: {
    list: () => ({
      queryKey: [''],
      queryFn: () => {},
    }),
    item: (directoryId: number) => ({
      queryKey: [directoryId],
      queryFn: () => {},
    }),
  },

  document: {
    list: (params?: { directoryId?: string; sortOption?: Document.Sort }) => ({
      queryKey: [params],
      queryFn: () => REQUEST.document.fetchDocuments(params),
    }),
    item: (documentId: number) => ({
      queryKey: [documentId],
      queryFn: () => REQUEST.document.fetchDocumentDetail(documentId),
    }),
  },
})
