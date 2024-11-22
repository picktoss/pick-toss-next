import Icon from '@/shared/components/custom/icon'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'

const EditCancelDialog = () => {
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <Icon name="cancel" className="size-[24px]" />
      </DialogTrigger>
      <DialogContent
        className="flex min-h-[170px] w-[280px] flex-col items-center justify-between rounded-[16px] bg-background-base-01"
        displayCloseButton={false}
      >
        <DialogTitle className="mb-[16px] w-full text-subtitle2-bold">
          수정을 취소할까요?
        </DialogTitle>

        <Text
          typography="text1-medium"
          className="flex h-fit w-full whitespace-nowrap text-text-secondary"
        >
          지금까지 수정한 내용은 저장되지 않습니다.
        </Text>

        <div className="mt-[40px] flex w-full justify-end text-button2">
          <DialogClose asChild>
            <button className="p-[4px] text-button-text-tertiary">계속하기</button>
          </DialogClose>
          <button
            onClick={() => router.back()}
            className="ml-[21px] p-[4px] text-button-text-primary"
          >
            수정 취소
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditCancelDialog
