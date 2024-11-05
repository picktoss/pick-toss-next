import { Button } from '@/shared/components/ui/button'
import NewQuizDrawer from '@/features/quiz/components/new-quiz-drawer'
import FixedBottom from '@/shared/components/custom/fixed-bottom'

const CreateQuizButton = () => {
  return (
    <FixedBottom className="px-[20px]">
      <NewQuizDrawer
        triggerComponent={
          <Button variant={'largeRound'} colors={'primary'} className="flex-center h-[52px] w-full">
            퀴즈 만들기
          </Button>
        }
      />
    </FixedBottom>
  )
}

export default CreateQuizButton
