type BaseQuiz = {
  id: string
  question: string
  answer: string
  explanation: string
}

type MultipleChoiceQuiz = BaseQuiz & {
  type: 'multiple'
  options: string[]
}

type OXQuiz = BaseQuiz & {
  type: 'ox'
  answer: 'O' | 'X'
}

type Quiz = MultipleChoiceQuiz | OXQuiz

declare namespace Quiz {
  type Item = Quiz
  type List = Quiz[]
}
