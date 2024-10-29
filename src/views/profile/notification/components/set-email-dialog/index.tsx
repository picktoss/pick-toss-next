'use client'

import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'
import { useNotification } from '../../context/notification-context'

interface Props {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const SetEmailDialog = ({ isOpen, setIsOpen }: Props) => {
  const { setOffEmail } = useNotification()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="flex size-fit flex-col items-center gap-[36px] rounded-[20px] bg-background-base-01 px-[24px] py-[28px]"
        displayCloseButton={false}
      >
        <div className="flex-center flex-col gap-[8px]">
          <DialogTitle>
            <Text typography="title3" className="font-suit">
              이메일을 등록하시겠어요?
            </Text>
          </DialogTitle>

          <Text typography="text1-medium" className="text-center text-text-sub">
            이메일로도 픽토스님을 위한 <br />
            퀴즈 알림을 받아보실 수 있어요
          </Text>
        </div>

        <div className="flex-center w-full flex-col gap-[16px]">
          <Button
            variant={'largeRound'}
            colors={'primary'}
            className="w-full px-[64.5px] py-[15px]"
          >
            지금 바로 등록하기
          </Button>

          <button
            onClick={() => {
              setOffEmail(true)
              setIsOpen(false)
            }}
          >
            <Text typography="button4" className="text-button-text-tertiary">
              다음에 등록하기
            </Text>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SetEmailDialog
