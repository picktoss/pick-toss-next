import QuizSolvedToday from '@/features/analysis/components/quiz-solved-today'
import AddFirstDocument from '@/features/document/components/add-first-document'
import { SwitchCase } from '@/shared/components/custom/react/switch-case'
import CountdownToMidnight from '../countdown-to-midnight'
import TodayQuizArrived from '../today-quiz-arrived'

interface Props {
  state: 'EMPTY' | 'NOT_ARRIVED' | 'ARRIVED'
  quizSetId: string
  createdAt: string
  todaySolved: number
}

const MainTodayQuizArea = ({ state, quizSetId, createdAt, todaySolved }: Props) => {
  return (
    <SwitchCase
      value={state}
      caseBy={{
        EMPTY: <AddFirstDocument userName={'픽토스'} />,

        NOT_ARRIVED: (
          <div className="flex flex-col pt-[25px]">
            <QuizSolvedToday quizCount={todaySolved} />
            <CountdownToMidnight />
          </div>
        ),

        ARRIVED: <TodayQuizArrived quizSetId={quizSetId} createdAt={createdAt} />,
      }}
    />
  )
}

export default MainTodayQuizArea
