'use client'

import GoBackButton from '@/shared/components/custom/go-back-button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'

// Header 컴포넌트
const Header = () => {
  return (
    <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
      <CancelInquiryDialog />
      <Text typography="subtitle2-medium" className="center">
        문의하기
      </Text>
    </header>
  )
}

// Header 내부에서 사용되는 컴포넌트
export default Header

const CancelInquiryDialog = () => {
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <GoBackButton onClick={() => {}} />
      </DialogTrigger>

      <DialogContent
        displayCloseButton={false}
        className="flex size-fit min-w-[285px] flex-col justify-center rounded-[20px] bg-background-base-01 p-[24px]"
      >
        <DialogTitle className="mb-[16px] text-subtitle2-bold">문의를 취소할까요?</DialogTitle>

        <Text typography="text1-medium" className="mb-[40px] text-text-secondary">
          지금까지 작성한 내용은 저장되지 않습니다.
        </Text>

        <div className="flex items-center justify-end gap-[32px]">
          <DialogClose>
            <Text typography="button2" className="text-button-text-tertiary">
              계속하기
            </Text>
          </DialogClose>
          <DialogClose onClick={() => router.back()}>
            <Text typography="button2" className="text-button-text-primary">
              문의 취소
            </Text>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
