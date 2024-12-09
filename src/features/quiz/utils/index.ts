export const getOptionCondition = (
  option: string,
  result: Quiz.Result | null,
  rightAnswer: string
) => {
  if (!isQuizSolved(result)) return 'IDLE'
  if (result.answer === true && result.choseAnswer === option) return 'RIGHT'
  if (result.answer === false && result.choseAnswer === option) return 'WRONG'
  if (option === rightAnswer) return 'RIGHT'
  return 'DISABLED'
}

export const getOXCondition = (result: Quiz.Result | null) => {
  if (!isQuizSolved(result)) return 'IDLE'
  if (result.answer === true && result.choseAnswer === 'correct') return 'RIGHT'
  if (result.answer === false && result.choseAnswer === 'correct') return 'WRONG'
  return 'WRONG'
}

export const isQuizSolved = (result: Quiz.Result | null): result is Quiz.Result => {
  return result !== null
}

export const getAnswerText = (answer: string) => {
  const OXType = ['correct', 'incorrect'] as Quiz.OXAnswer[]
  const isOXType = OXType.find((oxType) => oxType === answer)

  if (isOXType) {
    if (answer === 'correct') return 'O'
    if (answer === 'incorrect') return 'X'
  }

  return answer
}

export const getQuizSetTypeEnum = (quizSetType: 'today' | 'document' | 'collection' | 'create') => {
  let enumQuizType: Quiz.Set.Type

  switch (quizSetType) {
    case 'today':
      enumQuizType = 'TODAY_QUIZ_SET'
      break
    case 'document':
      enumQuizType = 'DOCUMENT_QUIZ_SET'
      break
    case 'collection':
      enumQuizType = 'COLLECTION_QUIZ_SET'
      break
    case 'create':
      enumQuizType = 'FIRST_QUIZ_SET'
      break
  }

  return enumQuizType
}
