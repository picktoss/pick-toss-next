'use client'

import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import useCountdownToMidnight from '@/shared/hooks/use-countdown-to-midnight'

const CountdownToMidnight = () => {
  const { timeLeft } = useCountdownToMidnight()

  return (
    <Button
      disabled
      variant={'largeRound'}
      colors={'unselected'}
      className="w-full rounded-[16px] disabled:text-text-caption"
    >
      <Icon name="clock" className="mr-[8px] size-[20px]" />
      <Text typography="text1-medium">다음 오늘의 퀴즈까지 {timeLeft}</Text>
    </Button>
  )
}

export default CountdownToMidnight
