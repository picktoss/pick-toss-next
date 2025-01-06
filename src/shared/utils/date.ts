const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

export const formatDateKorean = (
  dateString: string,
  option?: {
    year?: boolean
    month?: boolean
    day?: boolean
    dayOfWeek?: boolean
  }
): string => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const dayOfWeek = days[date.getDay()]

  if (option) {
    return [
      option?.year && `${year}년`,
      option?.month && `${Number(month)}월`,
      option?.day && `${Number(day)}일`,
      option?.dayOfWeek && dayOfWeek,
    ]
      .filter((value) => value)
      .join(' ')
  } else {
    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}`
  }
}

export const getCurrentDate = (option?: {
  year?: boolean
  month?: boolean
  day?: boolean
  dayOfWeek?: boolean
}): string => {
  const date = new Date()

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayOfWeek = days[date.getDay()]

  if (option) {
    return [
      option?.year && `${year}년`,
      option?.month && `${month}월`,
      option?.day && `${day}일`,
      option?.dayOfWeek && dayOfWeek,
    ]
      .filter((value) => value)
      .join(' ')
  }

  const formattedDate = `${year}년 ${month}월 ${day}일 ${dayOfWeek}`

  return formattedDate
}

export const getRelativeTime = (time: string) => {
  const inputTime = new Date(time)
  const currentTime = new Date()

  const relativeTime = currentTime.getTime() - inputTime.getTime()
  const relativeMinutes = Math.floor(relativeTime / (1000 * 60))
  const relativeHours = Math.floor(relativeMinutes / 60)
  const relativeDays = Math.floor(relativeHours / 24)

  if (relativeMinutes < 10) {
    return '방금 전'
  }
  if (relativeMinutes < 60) {
    return `${relativeMinutes}분 전`
  }
  if (relativeHours < 24) {
    return `${relativeHours}시간 전`
  }
  if (relativeDays === 1) {
    return `하루 전`
  }
  if (relativeDays === 2) {
    return `이틀 전`
  }
  if (relativeDays < 4) {
    return `${relativeDays}일 전`
  }

  const months = inputTime.getMonth() + 1
  const days = inputTime.getDate()

  return `${months}월 ${days}일`
}

export const currentMonth = () => {
  const date = new Date()
  return date.getMonth() + 1
}

export function calculateTimeUntilTomorrowMidnight() {
  const now = new Date()
  const tomorrowMidnight = new Date(now)

  tomorrowMidnight.setDate(tomorrowMidnight.getDate() + 1)
  tomorrowMidnight.setHours(0, 0, 0, 0)

  const timeDifference = tomorrowMidnight.getTime() - now.getTime()

  if (timeDifference <= 0) {
    return { hours: 0, minutes: 0 }
  }

  const hours = Math.floor(timeDifference / (1000 * 60 * 60))
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))

  return { hours, minutes }
}

export function getCurrentTime() {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}

// YYYY-MM-DD 형식으로 반환
export const formatToYYYYMMDD = (date: Date) => {
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(date.getDate()).padStart(2, '0')}`

  return formattedDate
}

// YYYY-MM 형식으로 반환
export const formatToYYYYMM = (date: Date): string => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // 2자리로 맞춤
  return `${year}-${month}`
}

// M.D 형식으로 변환
export const formatToMD = (dateString: string): string => {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string')
  }

  // 월(m)과 일(d) 앞의 '0' 제거
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${month}.${day}`
}

/** 퀴즈 분석 월 단위 - 이전 달 계산 */
export const getPreviousMonth = (yyyymm: string): string => {
  const [year, month] = yyyymm.split('-').map(Number)
  const date = new Date(year ?? 1, (month ?? 1) - 1) // 입력된 월로 Date 생성 (0부터 시작)

  date.setMonth(date.getMonth() - 1) // 이전 달로 이동

  const prevYear = date.getFullYear()
  const prevMonth = (date.getMonth() + 1).toString().padStart(2, '0') // 2자리로 맞춤

  return `${prevYear}-${prevMonth}`
}

/** 퀴즈 분석 월 단위 - 다음 달 계산 */
export const getNextMonth = (yyyymm: string): string => {
  const [year, month] = yyyymm.split('-').map(Number)
  const date = new Date(year ?? 1, (month ?? 1) - 1) // 입력된 월로 Date 생성 (0부터 시작)

  date.setMonth(date.getMonth() + 1) // 다음 달로 이동

  const nextYear = date.getFullYear()
  const nextMonth = (date.getMonth() + 1).toString().padStart(2, '0') // 2자리로 맞춤

  return `${nextYear}-${nextMonth}`
}

/** 퀴즈 분석 주 단위 - 시작 날짜 계산 */
export const getSixDaysAgo = (): Date => {
  const today = new Date()
  today.setDate(today.getDate() - 6)
  return today
}

/** 퀴즈 분석 주 단위 - 특정 날짜를 넣으면 [7일 전 날짜, 1일 전 날짜] 반환 */
export const getPastDatesFromGivenDate = (dateString: string): string[] => {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string')
  }

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0] ?? ''
  }

  const sevenDaysAgo = new Date(date)
  sevenDaysAgo.setDate(date.getDate() - 7)

  const oneDayAgo = new Date(date)
  oneDayAgo.setDate(date.getDate() - 1)

  return [formatDate(sevenDaysAgo), formatDate(oneDayAgo)]
}

/** 퀴즈 분석 주 단위 - 특정 날짜를 넣으면 [1일 후 날짜, 7일 후 날짜] 반환 */
export const getFutureDatesFromGivenDate = (dateString: string): string[] => {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string')
  }

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0] ?? ''
  }

  const oneDayLater = new Date(date)
  oneDayLater.setDate(date.getDate() + 1)

  const sevenDaysLater = new Date(date)
  sevenDaysLater.setDate(date.getDate() + 7)

  return [formatDate(oneDayLater), formatDate(sevenDaysLater)]
}

/** 오늘을 기준으로 +-2일에 해당할 경우 true 반환 */
export const isAdjacentDate = (dateString: string): boolean => {
  const today = new Date()
  const input = new Date(dateString)

  const diffDays = Math.abs((today.getTime() - input.getTime()) / (1000 * 60 * 60 * 24))
  return diffDays >= 0.5 && diffDays <= 2.5
}
