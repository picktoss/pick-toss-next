import { useEffect, useState } from 'react'
import { msToElapsedTime } from '../utils/time'

const getTimeUntilMidnight = () => {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)

  return midnight.getTime() - now.getTime()
}

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
