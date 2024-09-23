import { AIPickDialog } from '@/shared/components/ai-pick-dialog'
import { Button } from '@/shared/components/ui/button'
import { StarsIcon } from 'lucide-react'

interface Props {
  isDesktop: boolean
  handleCreateAiPick: () => void
}

// AiPickUnprocessed 컴포넌트
const AiPickUnprocessed = ({ isDesktop, handleCreateAiPick }: Props) => {
  return (
    <div
      className={`absolute bottom-1/2 flex w-full flex-col items-center gap-[24px] text-center ${
        isDesktop ? 'text-text-medium' : 'text-text2-bold'
      }  text-gray-08`}
    >
      <p>
        AI pick으로 퀴즈 내용을 선정하고
        <br />
        노트 요약을 확인해보세요
      </p>
      <AIPickDialog
        trigger={
          <Button variant="gradation" size="sm" className="w-fit gap-[4px]">
            <StarsIcon />
            pick 시작
          </Button>
        }
        confirm={() => handleCreateAiPick()}
      />
    </div>
  )
}

export default AiPickUnprocessed
