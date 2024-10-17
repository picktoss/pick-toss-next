import { PropsWithChildren } from 'react'

const QuizList = ({ children }: PropsWithChildren) => {
  return <div className="flex h-fit w-full flex-col gap-[12px]">{children}</div>
}

export default QuizList
