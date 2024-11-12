import { useEffect, useState } from 'react'
import { getTimeUntilMidnight, msToElapsedTime } from '../utils/time'

const useCountdownToMidnight = () => {
  const [timeLeft, setTimeLeft] = useState<string>('')

  useEffect(() => {
    const updateTimeLeft = () => {
      setTimeLeft(msToElapsedTime(getTimeUntilMidnight()))
    }

    updateTimeLeft()
    const timer = setInterval(updateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return { timeLeft }
}

export default useCountdownToMidnight
