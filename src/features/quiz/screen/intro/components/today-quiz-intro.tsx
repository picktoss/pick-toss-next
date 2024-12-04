import Text from '@/shared/components/ui/text'
import Image from 'next/image'
import SpringUpCardAnimation from '@/shared/components/custom/spring-up-card-animation'

interface Props {
  createdAt: string
  onAnimationComplete: () => void
}

const TodayQuizIntro = ({ createdAt, onAnimationComplete }: Props) => {
  return (
    <div className="flex-center h-dvh w-dvw max-w-mobile bg-background-base-02">
      <SpringUpCardAnimation
        className="bg-[var(--color-blue-600)]"
        cardName={
          <Text typography="title1" color="primary-inverse">
            오늘의 퀴즈
          </Text>
        }
        createdAt={
          <Text typography="text1-medium" color="primary-inverse" className="font-suit">
            {createdAt}
          </Text>
        }
        image={
          <Image
            src={'/images/twinkle-picktoss.png'}
            alt=""
            width={172}
            height={151}
            className="ml-[21px]"
          />
        }
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  )
}

export default TodayQuizIntro
