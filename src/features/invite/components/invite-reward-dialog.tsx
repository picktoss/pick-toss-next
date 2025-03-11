'use client'

import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const InviteRewardDialog = () => {
  const router = useRouter()

  const handleClickConfirm = () => {
    const checkInvited = Cookies.get('check-invited')

    if (checkInvited) {
      Cookies.remove('check-invited')
    }

    router.replace('/main')
  }

  return (
    <Dialog defaultOpen>
      <DialogContent
        displayCloseButton={false}
        className="flex-center h-fit w-[308px] flex-col rounded-[20px] bg-background-base-01 p-[24px]"
        onPointerDownOutside={(e) => {
          e.preventDefault()
        }}
      >
        <div className="relative">
          <Icon name="star" className="size-[80px]" />
          <Text typography="title3" color="secondary" className="absolute bottom-0 right-0">
            x50
          </Text>
        </div>

        <DialogTitle>
          <Text typography="title3" className="mt-[24px]">
            친구 초대 보상 도착
          </Text>
        </DialogTitle>
        <Text typography="text1-regular" color="sub" className="mt-[8px] text-center">
          초대 보상으로 픽토스님께 <br />별 50개를 드려요
        </Text>

        <DialogClose className="mt-[36px] w-full focus:outline-none">
          <Button onClick={handleClickConfirm} className="w-full">
            별 50개 받기
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default InviteRewardDialog
