import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Label } from '@/shared/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'

const options = [
  { id: 'option-one', value: 'option-one', label: '선지 혹은 질문이 보이지 않습니다' },
  { id: 'option-two', value: 'option-two', label: '질문 형식이 맞지 않습니다' },
  { id: 'option-three', value: 'option-three', label: '퀴즈가 노트와 무관한 내용입니다' },
]

interface Props {
  handlePassQuiz: () => void
}

export function ReportQuizError({ handlePassQuiz }: Props) {
  const [open, setOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (value) {
          setSelectedOption(null)
        }
        setOpen(value)
      }}
    >
      <DialogTrigger className="rounded-[8px] bg-gray-02 px-[20px] py-[10px]">
        <div className="flex items-center gap-[8px]">
          <CautionIcon />
          <p className="text-small1-bold text-gray-06">퀴즈에 문제가 있어요</p>
        </div>
      </DialogTrigger>
      <DialogContent className="w-fit !rounded-[12px] pb-[28px] pt-[64px] lg:w-[402px]">
        <DialogHeader className="*:text-center">
          <DialogTitle className="text-h4-bold text-gray-09">
            발생한 문제를 선택해주세요.
          </DialogTitle>
          <DialogDescription className="text-small1-regular text-gray-08">
            해당 퀴즈를 풀지 않고 넘길 수 있으며, 소모한 별은 반환됩니다
          </DialogDescription>
        </DialogHeader>

        <RadioGroup
          className="mb-[41px] mt-[30px] flex flex-col items-center gap-[16px]"
          onValueChange={(value) => setSelectedOption(value)}
        >
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
              <Label
                htmlFor={option.id}
                className={cn(
                  'flex h-[37px] w-[228px] cursor-pointer items-center justify-center rounded-[8px] bg-gray-01 text-text-medium text-gray-08',
                  selectedOption === option.value && 'text-orange-06 bg-orange-01'
                )}
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <DialogFooter>
          <Button
            className="mx-auto w-[280px] disabled:bg-gray-02 disabled:text-gray-06"
            disabled={selectedOption == null}
            onClick={() => {
              handlePassQuiz()
              setOpen(false)
            }}
          >
            퀴즈 넘기기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function CautionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="8" stroke="#A2A6AB" strokeWidth="2" />
      <rect x="8.11133" y="4.55566" width="1.77778" height="6.22222" rx="0.888889" fill="#A2A6AB" />
      <rect x="8.11133" y="11.6665" width="1.77778" height="1.77778" rx="0.888889" fill="#A2A6AB" />
    </svg>
  )
}
