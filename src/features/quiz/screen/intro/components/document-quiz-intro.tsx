import SpringUpCardAnimation from '@/shared/components/custom/spring-up-card-animation'
import Text from '@/shared/components/ui/text'

interface Props {
  createdAt: string
  documentName: string
  directoryEmoji: string
  onAnimationComplete: () => void
}

const DocumentQuizIntro = ({
  createdAt,
  documentName,
  directoryEmoji,
  onAnimationComplete,
}: Props) => {
  return (
    <div className="flex-center h-dvh w-dvw max-w-mobile bg-background-base-02">
      <SpringUpCardAnimation
        className="bg-white"
        cardName={<Text typography="title1">{documentName}</Text>}
        createdAt={
          <Text typography="text1-medium" className="font-suit">
            {createdAt}
          </Text>
        }
        image={<div className="text-[100px]">{directoryEmoji}</div>}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  )
}

export default DocumentQuizIntro
