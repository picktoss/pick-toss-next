import SpringUpCardAnimation from '@/shared/components/custom/spring-up-card-animation'
import Text from '@/shared/components/ui/text'

interface Props {
  createdAt: string
  collectionName: string
  collectionEmoji: string
  onAnimationComplete: () => void
}

const CollectionQuizIntro = ({
  createdAt,
  collectionName,
  collectionEmoji,
  onAnimationComplete,
}: Props) => {
  return (
    <div className="flex-center h-dvh w-dvw max-w-mobile bg-background-base-02">
      <SpringUpCardAnimation
        className="bg-[var(--color-gray-800)]"
        cardName={
          <Text typography="title1" color="primary-inverse">
            {collectionName}
          </Text>
        }
        createdAt={
          <Text typography="text1-medium" color="primary-inverse" className="font-suit">
            {createdAt}
          </Text>
        }
        image={<div className="text-[100px]">{collectionEmoji}</div>}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  )
}

export default CollectionQuizIntro
