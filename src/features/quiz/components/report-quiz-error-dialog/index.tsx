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
import { useDeleteInvalidQuiz } from '@/requests/quiz/hooks'

interface Props {
  onNext: () => void
  id?: number
}

type QuizErrorType = Quiz.Request.DeleteInvalidQuiz['quizErrorType']

const ReportQuizErrorDialog = ({ id, onNext }: Props) => {
  const [selectedOption, setSelectedOption] = useState<QuizErrorType | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { mutate: deleteInvalidQuiz } = useDeleteInvalidQuiz()

  const handleOptionClick = (key: QuizErrorType) => {
    setSelectedOption(key)
  }

  const handleNextQuestion = () => {
    // TODO: 여기에 선택된 옵션 처리 로직 추가
    if (id != null && selectedOption) {
      const payload = {
        quizId: id,
        requestBody: { quizErrorType: selectedOption },
      }
      deleteInvalidQuiz(payload, {
        onSuccess: () => {
          onNext()
        },
      })
      setIsOpen(false)
      setSelectedOption(null)
    } else {
      console.error('quiz id가 존재하지 않습니다')
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
    setSelectedOption(null)
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
              key={option.key}
              onClick={() => handleOptionClick(option.key)}
              className={cn(
                'w-full rounded-[10px] border py-[9.5px] transition-colors',
                selectedOption === option.key
                  ? 'border-border-selected bg-button-fill-secondary text-button-label-secondary'
                  : 'text-button-label-tertiary'
              )}
            >
              <Text typography={selectedOption === option.key ? 'button3' : 'button4'}>
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
            disabled={!(selectedOption != null)}
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

export default ReportQuizErrorDialog
