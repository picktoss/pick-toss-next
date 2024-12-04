import { useRef, useState, useCallback } from 'react'

const BASIC_THROTTLE_TIME = 1000

export default function useThrottleDebounce({
  callback,
  delay = BASIC_THROTTLE_TIME,
}: {
  callback: (value: string | null | undefined) => void
  delay?: number
}) {
  const lastValue = useRef<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const throttleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const throttleDebounce = useCallback(
    (value: string | null) => {
      lastValue.current = value
      setIsSaving(true)

      debounceTimer.current = null

      if (!throttleTimer.current) {
        callback(value)
        throttleTimer.current = setTimeout(() => {
          throttleTimer.current = null
          if (lastValue.current !== value) {
            callback(lastValue.current)
          }
          setIsSaving(false)
        }, delay)
      }

      debounceTimer.current = setTimeout(() => {
        if (lastValue.current !== value) {
          callback(lastValue.current)
        }
        setIsSaving(false)
      }, delay)
    },
    [callback, delay]
  )

  return { throttleDebounce, isSaving }
}
