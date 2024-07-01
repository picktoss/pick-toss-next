import Image from 'next/image'
import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import icons from '@/constants/icons'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { postFeedback } from '@/apis/fetchers/feedback/post-feedback/fetcher'
import { useToast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'

const feedbackOption = [
  { type: 'GENERAL', label: '일반 질문' },
  { type: 'QUIZ_ERROR', label: '퀴즈 오류' },
  { type: 'SUBSCRIPTION_PAYMENT', label: '구독 및 결제' },
] as const

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function FeedbackDialog({ open, onOpenChange }: Props) {
  const { data: session } = useSession()
  const { toast } = useToast()

  const [typeOption, setTypeOption] = useState<(typeof feedbackOption)[number]>(feedbackOption[0])
  const [content, setContent] = useState('')

  const { mutate: mutateFeedback } = useMutation({
    mutationFn: postFeedback,
    onSuccess: () => {
      toast({ description: '문의 요청이 완료되었습니다' })
    },
  })

  const handleSubmit = () => {
    mutateFeedback({ type: typeOption.type, content, accessToken: session?.user.accessToken || '' })
    setTypeOption(feedbackOption[0])
    setContent('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[335px] lg:w-[560px]">
        <div className="mb-[43px] text-center text-h4-bold text-gray-09">문의하기</div>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="flex h-[40px] w-[186px] items-center justify-between rounded-[8px] bg-gray-01 px-[17px] text-body1-bold">
              <span>{typeOption.label}</span>
              <Image src={icons.chevronDown} alt="arrow-down" width={16} height={16} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {feedbackOption.map((option) => (
              <DropdownMenuItem key={option.type} onClick={() => setTypeOption(option)}>
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="my-[22px] h-[223px] w-full resize-none rounded-[8px] bg-gray-01 px-[14px] py-[18px] outline-none"
          placeholder="문의 내용을 자유롭게 작성해주세요"
        />
        <div className="flex justify-center">
          <DialogClose>
            <Button className="w-full lg:w-[280px]" onClick={handleSubmit}>
              제출하기
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
