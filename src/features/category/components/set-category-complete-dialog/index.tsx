import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'

interface Props {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const SetCategoryCompleteDialog = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        displayCloseButton={false}
        className="flex-center size-fit flex-col rounded-[20px] bg-background-base-01 p-[28px]"
      >
        <DialogTitle className="mb-[8px]">
          <Text typography="title3" className="font-suit">
            관심분야 설정 완료!
          </Text>
        </DialogTitle>

        <Text typography="text1-medium" className="mb-[36px] text-center text-text-sub">
          픽토스님이 좋아하실 컬렉션을 <br /> 지금 확인하러 갈까요?
        </Text>

        <Button className="mb-[16px] px-[74px] py-[15px]" onClick={() => setIsOpen(false)}>
          컬렉션 보러가기
        </Button>

        <DialogClose>
          <Text typography="button4" className="text-button-text-tertiary">
            다음에 확인하기
          </Text>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default SetCategoryCompleteDialog
