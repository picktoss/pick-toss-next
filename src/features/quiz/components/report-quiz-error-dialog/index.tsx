import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'
import { useState } from 'react'
import { reportOptions } from '../../config'
import { cn } from '@/shared/lib/utils'

const ResultQuizErrorDialog = () => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleOptionClick = (id: string) => {
    setSelectedOptionId(id)
  }

  const handleNextQuestion = () => {
    if (selectedOptionId) {
      // TODO: 여기에 선택된 옵션 처리 로직 추가
      setIsOpen(false)
      setSelectedOptionId(null)
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
    setSelectedOptionId(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-[4px]">
          <Icon name="question" />
          <Text typography="text2-medium" color="sub">
            문제에 오류가 있어요
          </Text>
        </button>
      </DialogTrigger>

      <DialogContent
        displayCloseButton={false}
        onPointerDownOutside={(e) => {
          e.preventDefault()
        }}
        className="pb-[16px] pt-[28px]"
      >
        <DialogHeader>
          <DialogTitle className="text-center">
            <Text typography="title3">발생한 오류를 선택해주세요</Text>
          </DialogTitle>
          <DialogDescription className="!mt-[8px] text-center">
            <Text typography="text1-medium" color="sub">
              해당 문제는 저장되지 않으며,
              <br />
              사용하신 별 1개를 돌려드려요
            </Text>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-[12px] px-[9px] py-[32px] *:text-center">
          {reportOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={cn(
                'w-full rounded-[10px] border py-[9.5px] transition-colors',
                selectedOptionId === option.id
                  ? 'border-border-selected bg-button-fill-secondary text-button-label-secondary'
                  : 'text-button-label-tertiary'
              )}
            >
              <Text typography={selectedOptionId === option.id ? 'button3' : 'button4'}>
                {option.label}
              </Text>
            </button>
          ))}
        </div>

        <div>
          <Button
            variant="mediumRound"
            className="w-full"
            onClick={handleNextQuestion}
            disabled={!(selectedOptionId != null)}
          >
            다음 문제 보기
          </Button>
          <button
            onClick={handleCancel}
            className="mt-[8px] w-full py-[8px] text-button-text-tertiary"
          >
            <Text typography="button4">신고 취소하기</Text>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ResultQuizErrorDialog
