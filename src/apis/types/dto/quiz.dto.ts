import { GetQuizSetsResponse } from '@/apis/fetchers/quiz/get-quiz-sets'

export type QuizDTO = GetQuizSetsResponse['quizzes'][number]
