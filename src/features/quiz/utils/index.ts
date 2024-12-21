export const getOptionCondition = (
  option: string,
  result: Quiz.Result | null,
  rightAnswer: string
) => {
  if (!isQuizSolved(result)) return 'IDLE'
  if (result?.answer === true && result?.choseAnswer === option) return 'RIGHT'
  if (result?.answer === false && result?.choseAnswer === option) return 'WRONG'
  if (option === rightAnswer) return 'RIGHT'
  return 'DISABLED'
}

export const getOXCondition = (result: Quiz.Result | null) => {
  if (!isQuizSolved(result)) return 'IDLE'
  if (result?.answer === true && result?.choseAnswer === 'correct') return 'RIGHT'
  if (result?.answer === false && result?.choseAnswer === 'correct') return 'WRONG'
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

/** 오답 터뜨리기 결과 변환 함수 */
export const prepareQuizResults = (quizResults: (Quiz.Result | null)[]) => {
  // id별로 가장 마지막 인덱스의 결과만 유지
  const latestResults = new Map()

  quizResults.forEach((result) => {
    if (result !== null) {
      latestResults.set(result.id, {
        id: result.id,
        answer: result.answer,
      })
    }
  })

  return Array.from(latestResults.values()) as { id: number; answer: boolean }[]
}
