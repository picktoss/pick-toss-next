type BaseQuiz = {
  id: number
  question: string
  answer: string
  explanation: string
}

type MultipleChoiceQuiz = {
  quizType: 'MULTIPLE_CHOICE'
  options: string[]
} & BaseQuiz

type OXQuiz = {
  quizType: 'MIX_UP'
  answer: 'correct' | 'wrong'
} & BaseQuiz

type CombineQuiz = MultipleChoiceQuiz | OXQuiz

type QuizType = 'MIX_UP' | 'MULTIPLE_CHOICE'

type Document = {
  id: number
  name: string
}

type Directory = {
  id: number
  name: string
}

type Category = {
  id: number
  name: string
}

type ConsecutiveDays = {
  currentConsecutiveDays: number
  maxConsecutiveDays: number
}

type QuizWithMetadata = {
  document: Document
  category: Category
} & CombineQuiz

type QuizRecord = {
  question: string
  answer: string
  explanation: string
  options: string[]
  choseAnswer: string
  documentName: string
  directoryName: string
}

type BaseRecord = {
  name: string
  quizCount: number
  score: number
  solvedDate: string
}

/** GET /api/v2/today-quiz-info */
interface TodayQuizInfoResponse extends ConsecutiveDays {}

/** GET /api/v2/quizzes */
interface AllQuizzesResponse {
  quizzes: QuizWithMetadata[]
}

/** GET /api/v2/quizzes/{quiz_set_id}/quiz-record */
interface QuizSetRecordResponse {
  createdAt: string
  totalElapsedTimeMs: number
  quizzes: QuizRecord[]
}

/** GET /api/v2/quizzes/quiz-records */
interface QuizRecordsResponse extends ConsecutiveDays {
  quizRecords: (BaseRecord & { quizSetId: string })[]
  collectionRecords: (BaseRecord & { collectionId: number })[]
}

/** GET /api/v2/quiz-sets/{quiz_set_id} */
interface QuizSetResponse {
  quizzes: QuizWithMetadata[]
  todayQuizSet: boolean
}

/** GET /api/v2/quiz-sets/today */
interface TodayQuizSetResponse {
  quizSetId: string
  type: 'READY' | 'NOT_READY' | 'DONE'
}

/** GET /api/v2/quiz-analysis */
interface QuizAnalysisResponse {
  totalElapsedTime: number
  quizzes: {
    date: string
    quizCount: number
    incorrectAnswerCount: number
  }[]
}

/** GET /api/v2/documents/{document_id}/review-pick */
interface ReviewPickResponse {
  quizzes: {
    id: number
    question: string
    answer: string
    explanation: string
    options: string[]
    quizType: QuizType
    description: string
  }[]
}

/** GET /api/v2/documents/{document_id}/quizzes */
interface DocumentQuizzesResponse {
  quizzes: QuizWithMetadata[]
}

/** GET /api/v2/documents/{document_id}/download-quiz */
type DownloadQuizResponse = string[]

/** PATCH /api/v2/quiz/result */
interface UpdateQuizResultPayload {
  quizSetId: string
  quizzes: {
    id: number
    answer: 'correct' | 'wrong'
    choseAnswer: string
    elapsedTime: number
  }[]
}
interface UpdateQuizResultResponse {
  reward: number
  currentConsecutiveTodayQuizDate: number
}

/** POST /api/v2/quizzes/documents/{document_id}/create-quizzes */
interface CreateQuizzesPayload {
  quizType: QuizType
  quizCount: number
}

interface GetDirectoryQuizzesResponse {
  quizzes: QuizWithMetadata[]
}

declare namespace Quiz {
  type Item = CombineQuiz
  type List = CombineQuiz[]
  type ItemWithMetadata = QuizWithMetadata
  type Type = QuizType
  type Record = QuizRecord
  type Result = UpdateQuizResultPayload['quizzes'][number]

  declare namespace Request {
    /** PATCH /api/v2/quiz/result
     * 퀴즈 결과 업데이트
     */
    type UpdateQuizResult = UpdateQuizResultPayload

    /** POST /api/v2/quizzes/documents/{document_id}/create-quizzes
     * 사용자가 생성한 문서에서 직접 퀴즈 생성(랜덤, OX, 객관식)
     */
    type CreateQuizzes = CreateQuizzesPayload
  }

  declare namespace Response {
    /** GET /api/v2/today-quiz-info
     * 오늘의 퀴즈 현황
     */
    type GetTodayInfo = TodayQuizInfoResponse

    /** GET /api/v2/quizzes
     * 생성된 모든 퀴즈 가져오기(전체 문서)
     */
    type GetAllQuizzes = AllQuizzesResponse

    /** GET /api/v2/quizzes/{quiz_set_id}/quiz-record
     * 퀴즈 세트에 대한 상세 기록
     */
    type GetQuizSetRecord = QuizSetRecordResponse

    /** GET /api/v2/quizzes/quiz-records
     * 전체 퀴즈 기록
     */
    type GetQuizRecords = QuizRecordsResponse

    /** GET /api/v2/quiz-sets/{quiz_set_id}
     * quizSet_id로 퀴즈 가져오기
     */
    type GetQuizSet = QuizSetResponse

    /** GET /api/v2/quiz-sets/today
     * 오늘의 퀴즈 세트 정보 가져오기
     */
    type GetTodayQuizSet = TodayQuizSetResponse

    /** GET /api/v2/quiz-analysis
     * 퀴즈 분석
     */
    type GetQuizAnalysis = QuizAnalysisResponse

    /** GET /api/v2/documents/{document_id}/review-pick
     * document_id로 복습 pick 가져오기
     */
    type GetReviewPick = ReviewPickResponse

    /** GET /api/v2/documents/{document_id}/quizzes
     * document_id에 해당하는 모든 퀴즈 가져오기
     */
    type GetDocumentQuizzes = DocumentQuizzesResponse

    /** GET /api/v2/directories/{directory_id}/quizzes
     * 디렉토리에 생성된 모든 퀴즈 랜덤하게 가져오기
     */
    type GetDirectoryQuizzes = GetDirectoryQuizzesResponse

    /** GET /api/v2/documents/{document_id}/download-quiz
     * 퀴즈 다운로드
     */
    type DownloadQuiz = DownloadQuizResponse

    /** PATCH /api/v2/quiz/result
     * 퀴즈 결과 업데이트
     */
    type UpdateQuizResult = UpdateQuizResultResponse
  }
}
