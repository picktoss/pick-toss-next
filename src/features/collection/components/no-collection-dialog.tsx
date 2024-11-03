import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'

interface Props {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
}

const NoCollectionDialog = ({ isOpen, onOpenChange }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        displayCloseButton={false}
        className="flex-center size-fit flex-col rounded-[20px] bg-background-base-01 px-[24px] py-[28px]"
      >
        <DialogTitle className="mb-[8px] font-suit text-title3">아직 컬렉션이 없어요</DialogTitle>
        <Text typography="text1-medium" className="mb-[36px] text-center text-text-sub">
          다른 사람들과 함께 공유할 <br />
          퀴즈 컬렉션을 만드시겠어요?
        </Text>

        <Button variant={'largeRound'} colors={'primary'} className="mb-[16px]">
          컬렉션 만들러 가기
        </Button>
        <DialogClose>다음에 만들기</DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default NoCollectionDialog
