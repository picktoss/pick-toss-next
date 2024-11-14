export const getOptionCondition = (
  option: string,
  result: Quiz.Result | null,
  correctAnswer: string
) => {
  if (!isQuizSolved(result)) return 'idle'
  if (result.answer === 'correct' && result.choseAnswer === option) return 'correct'
  if (result.answer === 'wrong' && result.choseAnswer === option) return 'wrong'
  if (option === correctAnswer) return 'correct'
  return 'disabled'
}

export const getOXCondition = (result: Quiz.Result | null) => {
  if (!isQuizSolved(result)) return 'idle'
  if (result.answer === 'correct' && result.choseAnswer === 'correct') return 'correct'
  if (result.answer === 'wrong' && result.choseAnswer === 'correct') return 'wrong'
  return 'wrong'
}

export const isQuizSolved = (result: Quiz.Result | null): result is Quiz.Result => {
  return result !== null
}
