import BottomButtons from '@/shared/components/custom/bottom-buttons'
import { Button } from '@/shared/components/ui/button'

const FixedBottomButtons = () => {
  // todo: 클릭 시 로직

  return (
    <BottomButtons
      left={
        <Button variant={'largeRound'} colors={'tertiary'} className="w-[35%]">
          초기화
        </Button>
      }
      right={
        <Button variant={'largeRound'} colors={'primary'} className="w-[65%]">
          저장하기
        </Button>
      }
    />
  )
}

export default FixedBottomButtons
