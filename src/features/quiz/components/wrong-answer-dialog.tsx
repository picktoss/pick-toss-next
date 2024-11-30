import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'

interface Props {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  answer: string
  explanation: string
  directoryName: string
  documentName: string
  onNext: () => void
}

const WrongAnswerDialog = ({
  isOpen,
  setIsOpen,
  answer,
  explanation,
  directoryName,
  documentName,
  onNext,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        displayCloseButton={false}
        onPointerDownOutside={(e) => {
          e.preventDefault()
        }}
        className="flex flex-col gap-[36px] px-[24px] pb-[24px] pt-[28px]"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-[16px]">
            <Icon name="wrong-x-round" />
            <Text typography="title1" color="wrong">
              오답
            </Text>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-[12px]">
          <Text typography="subtitle2-bold" color="secondary">
            정답: {answer}
          </Text>

          <Text typography="text1-medium" className="max-h-[30dvh] overflow-y-auto">
            {explanation}
          </Text>

          <Text typography="text2-medium" color="sub">
            {directoryName} {'>'} {documentName}
          </Text>
        </div>

        <DialogFooter>
          <Button onClick={() => onNext()}>다음</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default WrongAnswerDialog
