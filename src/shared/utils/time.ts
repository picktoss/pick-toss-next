export const msToElapsedTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
  const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}

export const msToMin = (ms: number) => {
  const millisecondsPerMinute = 60 * 1000
  const minutes = ms / millisecondsPerMinute

  return minutes
}

export const getTimeUntilMidnight = () => {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)

  return midnight.getTime() - now.getTime()
}

export const msToFormatMinSec = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  return `${formattedMinutes}분 ${formattedSeconds}초`
}
