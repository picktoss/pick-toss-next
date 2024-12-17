import { DeepRequired } from 'react-hook-form'
import { components, paths } from './schema'

/** 객체에서 특정 키를 옵셔널 처리해주는 타입 */
type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type BaseQuizItem = DeepRequired<components['schemas']['QuizDto']>
type QuizItem = MakeOptional<BaseQuizItem, 'options'>
type ReplayQuizType =
  | Exclude<DeepRequired<components['schemas']['QuizDto']['quizType']>, undefined>
  | 'RANDOM'

type QuizType = Exclude<DeepRequired<components['schemas']['QuizDto']['quizType']>, undefined>

type Metadata = {
  document: DeepRequired<components['schemas']['DocumentDto']>
  directory: DeepRequired<components['schemas']['DirectoryDto']>
}

declare global {
  /** <참고>
   * OX : correct/incorrect
   * 정답/오답 : right/wrong
   */
  declare namespace Quiz {
    type Item = QuizItem
    type ReplayType = ReplayQuizType

    type Type = QuizType
    type ReplayType = QuizType | 'RANDOM'
    type OXAnswer = 'correct' | 'incorrect'

    type Condition = 'IDLE' | 'DISABLED' | 'RIGHT' | 'WRONG'
    type Result = Quiz.Request.UpdateQuizResult['quizzes'][number]

    type Record = DeepRequired<components['schemas']['GetQuizRecordDto']>

    type SearchedQuiz = DeepRequired<components['schemas']['IntegratedSearchQuizDto']>

    declare namespace Set {
      type Type = Exclude<
        DeepRequired<components['schemas']['GetQuizRecordsDto']['quizSetType']>,
        undefined
      >

      type Record = DeepRequired<components['schemas']['GetSingleQuizSetRecordDto']>
    }

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

      /** GET /api/v2/quizzes/{solved_date}/quiz-records
       * 날짜별 퀴즈 기록
       */
      type GetQuizRecordsByDate = DeepRequired<
        paths['/api/v2/quizzes/{solved_date}/quiz-record']['get']['responses']['200']['content']['application/json;charset=UTF-8']
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

      /** POST /api/v2/collections/{collection_id}/collection-quizzes
       * 컬렉션 퀴즈 시작하기 응답
       */
      type StartCollectionQuiz = DeepRequired<
        paths['/api/v2/collections/{collection_id}/collection-quizzes']['post']['responses']['201']['content']['application/json;charset=UTF-8']
      >
    }
  }
}
