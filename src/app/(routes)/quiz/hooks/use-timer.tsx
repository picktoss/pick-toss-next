import { useBooleanState } from '@/hooks/use-boolean-state'
import { useEffect, useRef, useState } from 'react'

export function useTimer() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, runTimer, stopTimer] = useBooleanState(false)
  const timerRef = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    const startTime = new Date().getTime() - elapsedTime

    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime(new Date().getTime() - startTime)
      }, 200)
    } else {
      timerRef.current && clearInterval(timerRef.current)
      setElapsedTime(new Date().getTime() - startTime)
    }

    return () => {
      timerRef.current && clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning])

  return { totalElapsedTime: elapsedTime, runTimer, stopTimer }
}
