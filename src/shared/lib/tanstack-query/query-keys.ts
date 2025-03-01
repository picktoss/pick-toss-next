import { REQUEST } from '@/requests'
import { createQueryKeyStore } from '@lukemorales/query-key-factory'

export const queries = createQueryKeyStore({
  auth: {
    inviteLink: () => ({
      queryKey: [''],
      queryFn: () => REQUEST.auth.getInviteLink(),
      enabled: false,
      refetchOnWindowFocus: false, // 윈도우 포커스시 자동 리페치 방지
      staleTime: 0,
      cacheTime: 0,
    }),
    verifyInvite: (requestBody: Auth.Request.VerifyInviteCode) => ({
      queryKey: [requestBody],
      queryFn: () => REQUEST.auth.verifyInviteCode(requestBody),
      enabled: requestBody.inviteCode !== '',
    }),
    inviteCreator: (inviteCode: string) => ({
      queryKey: [inviteCode],
      queryFn: () => REQUEST.auth.getInviteCreator(inviteCode),
    }),
    rewardInviteSignUp: (inviteCode: string) => ({
      queryKey: [inviteCode],
      queryFn: () => REQUEST.auth.rewardInviteSignUp({ inviteCode }),
      enabled: !!inviteCode,
    }),
    checkInviteSignUp: (isChecked: boolean) => ({
      queryKey: [isChecked],
      queryFn: () => REQUEST.auth.checkSignUpWithInviteCode(),
      enabled: !isChecked,
    }),
  },

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
    recordsConsecutiveDays: (date: string) => ({
      queryKey: [date],
      queryFn: () => REQUEST.quiz.getRecordsConsecutiveDays(date),
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
    weeklyAnalysis: (startDate: string, endDate: string, directoryId?: number) => ({
      queryKey: [directoryId, startDate, endDate],
      queryFn: () => REQUEST.quiz.getWeeklyAnalysis(startDate, endDate, directoryId),
      enabled: !!directoryId || !!startDate || !endDate,
    }),
    monthlyAnalysis: (month: string, directoryId?: number) => ({
      queryKey: [directoryId, month],
      queryFn: () => REQUEST.quiz.getMonthlyAnalysis(month, directoryId),
      enabled: !!directoryId || !!month,
    }),
    solvedQuizCount: () => ({
      queryKey: [''],
      queryFn: () => REQUEST.quiz.getSolvedTodayCount(),
    }),
    todayQuizSetInfo: () => ({
      queryKey: [''],
      queryFn: () => REQUEST.quiz.getTodayQuizSetId(),
    }),
    consecutiveDays: () => ({
      queryKey: [''],
      queryFn: () => REQUEST.quiz.getConsecutiveDays(),
    }),
  },

  collection: {
    info: (collectionId: number) => ({
      queryKey: [collectionId],
      queryFn: () => REQUEST.collection.getCollectionInfo({ collectionId }),
      enabled: !!collectionId,
    }),
    interestedCategory: () => ({
      queryKey: [''],
      queryFn: () => REQUEST.collection.interestedCategoryCollections(),
    }),
    myListForAddQuiz: (quizId: number) => ({
      queryKey: [quizId],
      queryFn: () => REQUEST.collection.getMyCollectionsForAddQuiz(quizId),
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

  notification: {
    all: () => ({
      queryKey: [''],
      queryFn: () => REQUEST.notification.getAllNotifications(),
    }),
  },
})
