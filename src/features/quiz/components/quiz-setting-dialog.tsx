'use client'

import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Switch } from '@/shared/components/ui/switch'
import Text from '@/shared/components/ui/text'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  runTimer: () => void
  stopTimer: () => void
  handleActiveExplanation: (value: boolean) => void
  handleActiveTimer: (value: boolean) => void
}

const QuizSettingDialog = ({ runTimer, stopTimer }: Props) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [hideTimer, setHideTimer] = useState(false)
  const [skipExplanation, setSkipExplanation] = useState(false)

  const searchParams = useSearchParams()
  const currentHideTimer = searchParams.get('hideTimer') === 'true'
  const currentSkipExplanation = searchParams.get('skipExplanation') === 'true'

  useEffect(() => {
    if (open) {
      stopTimer()
    } else {
      runTimer()
    }
  }, [runTimer, stopTimer, open])

  const handleClickSave = () => {
    const hideTimerString = hideTimer ? 'true' : 'false'
    const skipExplanationString = skipExplanation ? 'true' : 'false'
    const params = new URLSearchParams(searchParams)

    if (currentHideTimer !== hideTimer || currentSkipExplanation !== skipExplanation) {
      if (currentHideTimer !== hideTimer) {
        params.set('hideTimer', hideTimerString)
      }

      if (currentSkipExplanation !== skipExplanation) {
        params.set('skipExplanation', skipExplanationString)
      }

      router.replace(`?${params.toString()}`, { scroll: false })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Icon name="adjust-controls" className="size-[24px]" />
      </DialogTrigger>

      <DialogContent displayCloseButton={false} className="flex flex-col px-[25px] py-[30px]">
        <DialogHeader className="flex-center mb-[40px] flex-col gap-[12px]">
          <DialogTitle className="">
            <Text typography="title3">퀴즈 설정</Text>
          </DialogTitle>
          <Text typography="text1-medium" color="sub" className="text-center">
            설정은 이번 문제부터 적용돼요
          </Text>
        </DialogHeader>

        <div className="flex-center mb-[62px] flex-col gap-[23px]">
          <div className="flex items-center gap-[21px]">
            <Text typography="subtitle2-medium">문제 바로 넘기기</Text>
            <Switch
              size={'md'}
              defaultChecked={currentSkipExplanation}
              checked={skipExplanation}
              onCheckedChange={setSkipExplanation}
            />
          </div>
          <div className="flex items-center gap-[21px]">
            <Text typography="subtitle2-medium">소요시간 숨기기</Text>
            <Switch
              size={'md'}
              defaultChecked={currentHideTimer}
              checked={hideTimer}
              onCheckedChange={setHideTimer}
            />
          </div>
        </div>

        <Button onClick={handleClickSave} className="w-full">
          저장하기
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default QuizSettingDialog
