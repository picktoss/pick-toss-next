'use client'

import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface ExitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  index: number
  isFirst: boolean
  redirectUrl?: string
}

const ExitDialog = ({ open, onOpenChange, index, isFirst, redirectUrl }: ExitDialogProps) => {
  const router = useRouter()

  const { quizExitClickEvent: quizExitEvent } = useAmplitudeContext()

  useEffect(() => {
    // 현재 페이지를 history stack에 추가
    // searchParams가 변경되면 해당 페이지로 이동하기 위해 index값을 의존성 배열에 추가
    window.history.replaceState(null, document.title, window.location.href)
  }, [index])

  useEffect(() => {
    const handlePopState = () => {
      // 뒤로가기 시도시 현재 페이지 유지
      window.history.replaceState(null, document.title, window.location.href)
      onOpenChange(true)
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // 페이지 새로고침이나 브라우저 닫기 시도시
      e.preventDefault()
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent displayCloseButton={false}>
        <DialogHeader className="mt-[8px] flex flex-col items-center">
          <Icon name="exit-door" />
          <DialogTitle className="!mt-[24px]">
            <Text typography="title3" className="text-center">
              {isFirst ? (
                <>
                  문제를 확인하지 않고 <br />
                  퀴즈에서 나가시겠어요?
                </>
              ) : (
                '퀴즈에서 나가시겠어요?'
              )}
            </Text>
          </DialogTitle>
          <DialogDescription className="!mt-[8px]">
            <Text typography="text1-medium" color="sub" className="text-center">
              {isFirst ? (
                <>
                  만든 문제는 퀴즈노트에 저장되지만 <br />
                  퀴즈를 푼 기록은 남지 않아요
                </>
              ) : (
                '현재까지 푼 퀴즈는 기록되지 않아요'
              )}
            </Text>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-[29px] flex flex-col gap-[8px]">
          <Button
            variant="mediumRound"
            className="w-full"
            onClick={() => {
              quizExitEvent()
              router.replace(redirectUrl || '/main')
            }}
          >
            나가기
          </Button>
          <Button
            variant="mediumRound"
            className="w-full"
            colors="secondary"
            onClick={() => onOpenChange(false)}
          >
            계속 풀기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ExitDialog
