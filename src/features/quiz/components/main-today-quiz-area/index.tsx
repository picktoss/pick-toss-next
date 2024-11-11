import QuizSolvedToday from '@/features/analysis/components/quiz-solved-today'
import AddFirstDocument from '@/features/document/components/add-first-document'
import { SwitchCase } from '@/shared/components/custom/react/switch-case'
import CountdownToMidnight from '../countdown-to-midnight'
import TodayQuizArrived from '../today-quiz-arrived'

// 오늘의 퀴즈 영역
// default(노트가 있고, 오늘의 퀴즈 도착 상태가 아닐 경우): 오늘 푼 퀴즈 + 다음 카운트다운
// caseA(노트가 없을 경우): 첫 노트 추가하기
// caseB(노트가 있고, 오늘의 퀴즈 도착 상태일 경우): 오늘의 퀴즈 도착

const MainTodayQuizArea = ({ state }: { state: 'EMPTY' | 'NOT_ARRIVED' | 'ARRIVED' }) => {
  return (
    <>
      <SwitchCase
        value={state}
        caseBy={{
          EMPTY: <AddFirstDocument userName={'픽토스'} />,

          NOT_ARRIVED: (
            <div className="flex flex-col pt-[25px]">
              <QuizSolvedToday quizCount={15} />
              <CountdownToMidnight />
            </div>
          ),

          ARRIVED: <TodayQuizArrived />,
        }}
      />
    </>
  )
}

export default MainTodayQuizArea
