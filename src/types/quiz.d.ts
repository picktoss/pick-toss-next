import { DeepRequired } from 'react-hook-form'
import { paths } from './schema'

type QuizSetType = 'DOCUMENT_QUIZ_SET' | 'TODAY_QUIZ_SET' | 'COLLECTION_QUIZ_SET' | 'FIRST_QUIZ_SET'

type QuizItem = {
  id: number
  question: string
  answer: string
  explanation: string
  quizType: 'MIX_UP' | 'MULTIPLE_CHOICE'
  options?: string[]
  answer?: 'correct' | 'incorrect'
}

type QuizType = 'MIX_UP' | 'MULTIPLE_CHOICE'
type ReplayQuizType = 'RANDOM' | 'MIX_UP' | 'MULTIPLE_CHOICE'

type QuizCondition = 'IDLE' | 'DISABLED' | 'RIGHT' | 'WRONG'

type Category = {
  id: number
  name: string
}

type DocumentInQuiz = Pick<Document.ItemInList, 'id' | 'name'>
type DirectoryInQuiz = Pick<Directory.Item, 'id' | 'name'>

type ConsecutiveDays = {
  currentConsecutiveDays: number
  maxConsecutiveDays: number
}

type QuizWithMetadata = {
  document: DocumentInQuiz
  directory: DirectoryInQuiz
} & QuizItem

type QuizWithCategory = {
  category: Category
} & QuizWithMetadata

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

declare global {
  declare namespace Quiz {
    type Item = QuizItem
    type List = QuizItem[]
    type ItemWithMetadata = QuizWithMetadata
    type ItemWithCategory = QuizWithCategory
    type Type = QuizType
    type Record = QuizRecord
    type Result = UpdateQuizResultPayload['quizzes'][number]

    declare namespace Request {
      /** PATCH /api/v2/quiz/result
       * 퀴즈 결과 업데이트
       */
      type UpdateQuizResult = DeepRequired<
        paths['/api/v2/quiz/result']['patch']['requestBody']['content']['application/json;charset=UTF-8']
      >

      /** POST /api/v2/quizzes/documents/{document_id}/custom-quiz-set
       * 사용자가 생성한 기존 문서에서 직접 퀴즈 세트 생성(랜덤, OX, 객관식) - 다시풀기 세트 만들기
       */
      type CreateReplayQuizSet = DeepRequired<
        paths['/api/v2/quizzes/documents/{document_id}/custom-quiz-set']['post']['requestBody']['content']['application/json;charset=UTF-8']
      >

      /** PATCH /api/v2/wrong-quiz/result
       * 오답 터뜨리기 결과 업데이트
       */
      type UpdateWrongQuizResult = DeepRequired<
        paths['/api/v2/wrong-quiz/result']['patch']['requestBody']['content']['application/json;charset=UTF-8']
      >
    }

    declare namespace Response {
      /** GET /api/v2/today-quiz-info
       * 오늘의 퀴즈 현황
       */
      type GetTodayInfo = DeepRequired<
        paths['/api/v2/today-quiz-info']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/quizzes/{quiz_set_id}/{quiz_set_type}/quiz-record
       * 퀴즈 세트에 대한 상세 기록
       */
      type GetQuizSetRecord = DeepRequired<
        paths['/api/v2/quizzes/{quiz_set_id}/{quiz_set_type}/quiz-record']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/quizzes/quiz-records
       * 전체 퀴즈 기록
       */
      type GetQuizRecords = DeepRequired<
        paths['/api/v2/quizzes/quiz-records']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/quiz-sets/{quiz_set_id}
       * quizSet-type과 quizSet_id로 퀴즈 세트 가져오기
       */
      type GetBaseQuizSet = DeepRequired<
        paths['/api/v2/quiz-sets/{quiz_set_id}']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/quiz-sets/today
       * 오늘의 퀴즈 세트 정보 가져오기
       */
      type GetTodayQuizSet = DeepRequired<
        paths['/api/v2/quiz-sets/today']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/quiz-analysis
       * 퀴즈 분석
       */
      type GetQuizAnalysis = DeepRequired<
        paths['/api/v2/quiz-analysis']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/documents/{document_id}/review-pick
       * document_id로 복습 pick 가져오기
       */
      type GetReviewPick = DeepRequired<
        paths['/api/v2/documents/{document_id}/review-pick']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/documents/{document_id}/quizzes
       * document_id에 해당하는 모든 퀴즈 가져오기
       */
      type GetDocumentQuizzes = DeepRequired<
        paths['/api/v2/documents/{document_id}/quizzes']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/directories/{directory_id}/quizzes
       * 디렉토리에 생성된 모든 퀴즈 랜덤하게 가져오기
       */
      type GetDirectoryQuizzes = DeepRequired<
        paths['/api/v2/directories/{directory_id}/quizzes']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/documents/{document_id}/download-quiz
       * 퀴즈 다운로드
       */
      type DownloadQuiz = DeepRequired<
        paths['/api/v2/documents/{document_id}/download-quiz']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/incorrect-quizzes
       * 오답 터뜨리기 퀴즈 가져오기
       */
      type GetWrongAnswerQuizzes = DeepRequired<
        paths['/api/v2/incorrect-quizzes']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** PATCH /api/v2/quiz/result
       * 퀴즈 결과 업데이트
       */
      type UpdateQuizResult = DeepRequired<
        paths['/api/v2/quiz/result']['patch']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** POST /api/v2/quizzes/documents/{document_id}/check-quiz-set
       * 퀴즈 생성 후 퀴즈 오류 확인을 위한 퀴즈 세트 생성
       */
      type CreateQuizSet = DeepRequired<
        paths['/api/v2/quizzes/documents/{document_id}/check-quiz-set']['post']['responses']['201']['content']['application/json;charset=UTF-8']
      >
    }
  }
}
