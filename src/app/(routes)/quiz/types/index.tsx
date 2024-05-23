export interface QuizProgress {
  quizIndex: number
  selectedMultipleQuizAnswer: number | null
  selectedMixUpQuizAnswer: 'correct' | 'incorrect' | null
  progress: 'idle' | 'choose' | 'result'
}
