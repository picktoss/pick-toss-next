type QuizSetType = 'DOCUMENT_QUIZ_SET' | 'TODAY_QUIZ_SET' | 'COLLECTION_QUIZ_SET' | 'FIRST_QUIZ_SET'

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

/** correct와 incorrect는 O/X를 의미. 정답을 맞혔다는 의미로는 right 사용 */
type OXQuizAnswer = 'correct' | 'incorrect'

type OXQuiz = {
  quizType: 'MIX_UP'
  answer: OXQuizAnswer
} & BaseQuiz

type CombineQuiz = MultipleChoiceQuiz | OXQuiz

type QuizType = 'MIX_UP' | 'MULTIPLE_CHOICE'

type QuizCondition = 'IDLE' | 'DISABLED' | 'RIGHT' | 'WRONG'

type Document = {
  id: number
  name: string
}

type DirectoryInQuiz = Pick<Directory.Item, 'id' | 'name'>

type ConsecutiveDays = {
  currentConsecutiveDays: number
  maxConsecutiveDays: number
}

type QuizWithMetadata = {
  document: Pick<Document, 'id' | 'name'>
  directory: DirectoryInQuiz
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

type QuizSetRecord = {
  quizSetId: string
  quizSetType: QuizSetType
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

/** GET /api/v2/quizzes/{quiz_set_id}/{quiz_set_type}/quiz-record */
interface QuizSetRecordResponse {
  createdAt: string
  totalElapsedTimeMs: number
  quizzes: QuizRecord[]
}

/** GET /api/v2/quizzes/quiz-records */
interface QuizRecordsResponse extends ConsecutiveDays {
  quizRecords: QuizSetRecord[]
}

/** GET /api/v2/documents/quiz-sets/{quiz_set_id} */
interface DocumentQuizSetResponse {
  quizzes: QuizWithMetadata[]
}

/** GET /api/v2/collections/{collection_id}/quiz-sets/{quiz_set_id} */
interface CollectionQuizSetResponse {
  collectionName: string
  quizzes: QuizWithMetadata[]
}

/** GET /api/v2/quiz-sets/today */
interface TodayQuizSetResponse {
  quizSetId: string
  createdAt?: string
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
    answer: boolean
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

/** GET /api/v2/directories/{directory_id}/quizzes */
interface GetDirectoryQuizzesResponse {
  quizzes: QuizWithMetadata[]
}

/** POST /api/v2/quizzes/documents/{document_id}/check-quiz-set */
interface CreateCheckQuizSetResponse {
  quizSetId: string
  createdAt: string
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

    /** GET /api/v2/quizzes/{quiz_set_id}/{quiz_set_type}/quiz-record
     * 퀴즈 세트에 대한 상세 기록
     */
    type GetQuizSetRecord = QuizSetRecordResponse

    /** GET /api/v2/quizzes/quiz-records
     * 전체 퀴즈 기록
     */
    type GetQuizRecords = QuizRecordsResponse

    /** GET /api/v2/documents/quiz-sets/{quiz_set_id}
     * quizSet_id로 문서 퀴즈 세트 가져오기
     */
    type GetDocumentQuizSet = DocumentQuizSetResponse

    /** GET /api/v2/collections/{collection_id}/quiz-sets/{quiz_set_id}
     * quizSet_id와 collection_id로 콜렉션 퀴즈 세트 가져오기
     */
    type GetCollectionQuizSet = CollectionQuizSetResponse

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

    /** POST /api/v2/quizzes/documents/{document_id}/check-quiz-set
     * 퀴즈 생성 후 퀴즈 오류 확인을 위한 퀴즈 세트 생성
     */
    type CreateCheckQuizSet = CreateCheckQuizSetResponse
  }
}
