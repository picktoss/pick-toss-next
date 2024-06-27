import { GetQuizSetsResponse } from '@/apis/fetchers/quiz/get-quiz-sets/fetcher'

export type QuizDTO = GetQuizSetsResponse['quizzes'][number]

export type QuizType = 'MIX_UP' | 'MULTIPLE_CHOICE'
