const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

export const formatDateKorean = (dateString: string): string => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}년 ${month}월 ${day}일`
}

export const getCurrentDate = () => {
  const date = new Date()

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayOfWeek = days[date.getDay()]

  const formattedDate = `${year}년 ${month}월 ${day}일 ${dayOfWeek}`

  return formattedDate
}
