import { Button } from '@/shared/components/ui/button'

const CreateQuizButton = () => {
  return (
    <div className="flex-center fixed bottom-[87px] h-[100px] w-full bg-background-base-01 pb-[36px] pt-[12px]">
      <Button variant={'largeRound'} colors={'primary'} className="flex-center h-[52px] w-[335px]">
        퀴즈 만들기
      </Button>
    </div>
  )
}

export default CreateQuizButton