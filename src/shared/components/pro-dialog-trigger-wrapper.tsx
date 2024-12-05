'use client'

import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog'
// import { Button } from './ui/button'
// import Image from 'next/image'
// import icons from '@/constants/icons'
// import ProTag from './pro-tag'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import { DialogTriggerProps } from '@radix-ui/react-dialog'
import PaymentPage from '@/app/(routes)/payment/page'
import NIGHT_SKY_IMG from '@/../../public/images/pro-star-background.png'
import GoBackButton from '@/shared/components/custom/go-back-button'

interface Props extends DialogTriggerProps, React.RefAttributes<HTMLButtonElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function ProDialogTriggerWrapper({ open, onOpenChange, children, ...props }: Props) {
  const { clickedEvent } = useAmplitudeContext()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        {...props}
        asChild
        onClick={() => {
          clickedEvent({
            buttonType: 'pro',
            buttonName: 'pro_dialog_trigger',
          })
        }}
      >
        {children}
      </DialogTrigger>
      <DialogContent className="h-dvh w-dvw max-w-mobile p-0" displayCloseButton={false}>
        <div
          className="fixed size-full min-h-screen max-w-mobile"
          style={{
            backgroundImage: `url(${NIGHT_SKY_IMG.src})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <header className="relative z-10 flex h-[54px] w-full items-center px-[16px] text-text-primary-inverse">
            <DialogClose>
              <GoBackButton icon="cancel" />
            </DialogClose>
          </header>

          <PaymentPage />
        </div>
        {/* <div className="mb-[4px] bg-gradient-to-r from-[#93B0FF] to-[#FF8428] bg-clip-text text-center text-h2-bold-eng text-transparent">
          Coming Soon
        </div>
        <div className="mb-[24px] text-center text-text-medium text-gray-08">
          더 다양한 기능의 픽토스 pro를 만나보세요
        </div>
        <div className="mx-[10px] mb-[20px] flex h-[270px] flex-col items-center justify-center gap-[8px] rounded-[12px] bg-gray-01 lg:h-[180px] lg:flex-row lg:gap-[36px]">
          <Image src={icons.logo} alt="logo" />
          <div>
            <div className="mb-[10px] flex items-center">
              <Image src={icons.logoTitle} alt="logo-title" />
              <ProTag />
            </div>
            <ul className="text-text-regular text-gray-09">
              <li> • 퀴즈 저장 가능</li>
              <li> • 주차별 복습 세트 생성</li>
              <li> • 별 무제한</li>
              <li> • 노트 창고 용량 확장</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <DialogClose asChild className="w-full">
            <Button className="w-full lg:w-[280px]">확인</Button>
          </DialogClose>
        </div> */}
      </DialogContent>
    </Dialog>
  )
}
