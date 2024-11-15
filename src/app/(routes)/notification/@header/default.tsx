'use client'

import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'
import usePreviousPath from '@/shared/hooks/use-previous-path'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()
  const { getPreviousPath } = usePreviousPath({ getCustomPath: true })

  const handleClick = () => {
    const previousPath = getPreviousPath()
    previousPath ? router.push(previousPath) : router.push('/')
  }

  return (
    <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
      <GoBackButton onClick={handleClick} />
      <Text typography="subtitle2-medium" className="center">
        알림
      </Text>
    </header>
  )
}

export default Header
