import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'
import Image from 'next/image'

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void
}

const FinishedBombDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        displayCloseButton={false}
        onPointerDownOutside={(e) => {
          e.preventDefault()
        }}
        className="flex flex-col px-[24px] pb-[24px] pt-[28px]"
      >
        <DialogHeader className="flex-center mb-[8px] flex-col">
          <Image
            src={'/images/bomb-complete.png'}
            alt=""
            width={83.1}
            height={139}
            className="mb-[24px]"
          />
          <DialogTitle className="flex items-center gap-[16px]">
            <Text typography="title3">모든 오답을 터뜨렸어요!</Text>
          </DialogTitle>
        </DialogHeader>

        <Text typography="text1-regular" color="sub" className="text-center">
          틀렸던 문제를 모두 복습했으니 <br />
          픽토스님의 실력은 더 상승할 거예요
        </Text>

        <Button onClick={() => onOpenChange(false)} className="mt-[36px] w-full">
          확인
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default FinishedBombDialog
