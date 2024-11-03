import { Button } from '@/shared/components/ui/button'
import NewQuizDrawer from '@/features/quiz/components/new-quiz-drawer'

const CreateQuizButton = () => {
  return (
    <div className="flex-center fixed bottom-[87px] right-1/2 h-[100px] w-full max-w-mobile translate-x-1/2 bg-background-base-01 pb-[36px] pt-[12px]">
      <NewQuizDrawer
        triggerComponent={
          <Button
            variant={'largeRound'}
            colors={'primary'}
            className="flex-center h-[52px] w-[335px]"
          >
            퀴즈 만들기
          </Button>
        }
      />
    </div>
  )
}

export default CreateQuizButton
