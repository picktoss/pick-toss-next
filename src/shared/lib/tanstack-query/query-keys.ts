import { REQUEST } from '@/requests'
import { createQueryKeyStore } from '@lukemorales/query-key-factory'

export const queries = createQueryKeyStore({
  directory: {
    list: () => ({
      queryKey: [''],
      queryFn: () => REQUEST.directory.getDirectories(),
    }),
    item: (directoryId: number) => ({
      queryKey: [directoryId],
      queryFn: () => REQUEST.directory.getDirectory(directoryId),
      enabled: !!directoryId,
    }),
  },

  document: {
    list: (params?: { directoryId?: string; sortOption?: Document.Sort }) => ({
      queryKey: [params],
      queryFn: () => REQUEST.document.getDocuments(params),
    }),
    item: (documentId?: number) => ({
      queryKey: [documentId],
      queryFn: () => REQUEST.document.getDocumentDetail(documentId),
      enabled: !!documentId,
    }),
    search: (requestBody: Document.Request.SearchDocuments) => ({
      queryKey: [requestBody],
      queryFn: () => REQUEST.document.searchDocument(requestBody),
      enabled: requestBody.keyword.trim() !== '',
      initialData: { documents: [], quizzes: [] },
    }),
    reviewNeeds: () => ({
      queryKey: [''],
      queryFn: () => REQUEST.document.getReviewNeedDocuments(),
    }),
  },

  quiz: {
    listByDocument: (params: { documentId: number; quizType?: Quiz.Type }) => ({
      queryKey: [params],
      queryFn: () => REQUEST.quiz.getDocumentQuizzes(params),
      enabled: !!params.documentId,
    }),
    allRecords: () => ({
      queryKey: [''],
      queryFn: () => REQUEST.quiz.getQuizRecords(),
    }),
    dateRecords: (date: string) => ({
      queryKey: [date],
      queryFn: () => REQUEST.quiz.getQuizRecordsByDate(date),
      enabled: !!date,
    }),
    setRecord: (params: { quizSetId: string; quizSetType: Quiz.Set.Type }) => ({
      queryKey: [params],
      queryFn: () => REQUEST.quiz.getQuizSetRecord(params),
      enabled: !!params.quizSetId,
    }),
    bomb: (key?: Date) => ({
      queryKey: [key],
      queryFn: () => REQUEST.quiz.getWrongAnswerQuizzes(),
    }),
    reviewPicks: (documentId: number) => ({
      queryKey: [documentId],
      queryFn: () => REQUEST.quiz.getReviewPicks(documentId),
    }),
    todayQuizInfo: () => ({
      queryKey: [''],
      queryFn: () => REQUEST.quiz.getTodayQuizInfo(),
    }),
  },

  collection: {
    info: (collectionId: number) => ({
      queryKey: [collectionId],
      queryFn: () => REQUEST.collection.getCollectionInfo({ collectionId }),
      enabled: !!collectionId,
    }),
  },

  search: {
    integrated: (requestBody: { keyword: string }) => ({
      queryKey: [requestBody],
      queryFn: () => REQUEST.search.getIntegratedSearches(requestBody),
      enabled: requestBody.keyword.trim() !== '',
      initialData: { documents: [], quizzes: [], collections: [] },
    }),
  },

  user: {
    info: () => ({
      queryKey: [''],
      queryFn: () => REQUEST.user.getUserInfo(),
    }),
  },
})
