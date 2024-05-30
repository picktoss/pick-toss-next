export interface QuizProgress {
  quizIndex: number
  selectedMultipleQuizAnswer: number | null
  selectedMixUpQuizAnswer: 'correct' | 'incorrect' | null
  progress: 'idle' | 'choose' | 'result'
}

export type SolvingData = {
  id: number
  answer: boolean
  elapsedTime: number
}[]
