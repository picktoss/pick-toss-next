import { REQUEST } from '@/requests'
import { createQueryKeyStore } from '@lukemorales/query-key-factory'

export const queries = createQueryKeyStore({
  directory: {
    list: () => ({
      queryKey: [''],
      queryFn: () => REQUEST.directory.fetchDirectories(),
    }),
    item: (directoryId: number) => ({
      queryKey: [directoryId],
      queryFn: () => REQUEST.directory.fetchDirectory(directoryId),
      enabled: !!directoryId,
    }),
  },

  document: {
    list: (params?: { directoryId?: string; sortOption?: Document.Sort }) => ({
      queryKey: [params],
      queryFn: () => REQUEST.document.fetchDocuments(params),
    }),
    item: (documentId?: number) => ({
      queryKey: [documentId],
      queryFn: () => REQUEST.document.fetchDocumentDetail(documentId),
      enabled: !!documentId,
    }),
  },

  quiz: {
    listByDocument: (params: { documentId: number; quizType?: Quiz.Type }) => ({
      queryKey: [params],
      queryFn: () => REQUEST.quiz.fetchDocumentQuizzes(params),
      enabled: !!params.documentId,
    }),
    setRecord: (quizSetId: string) => ({
      queryKey: [quizSetId],
      queryFn: () => REQUEST.quiz.fetchQuizSetRecord({ quizSetId }),
      enabled: !!quizSetId,
    }),
  },

  collection: {
    info: (collectionId?: number) => ({
      queryKey: [collectionId],
      queryFn: () => REQUEST.collection.fetchCollectionInfo({ collectionId }),
      enabled: !!collectionId,
    }),
  },
})
