import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import QS from 'qs'

export const useQuizNavigation = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = QS.parse(useSearchParams().toString(), { ignoreQueryPrefix: true })

  const getCurrentIndex = () => (searchParams.index ? Number(searchParams.index) : 0)

  const navigateToNext = (currentIndex: number) => {
    searchParams.index = String(currentIndex + 1)
    router.push(`${pathname}${QS.stringify(searchParams, { addQueryPrefix: true })}`)
  }

  return {
    currentIndex: getCurrentIndex(),
    navigateToNext,
  }
}
