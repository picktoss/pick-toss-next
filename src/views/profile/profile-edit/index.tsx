'use client'

import Icon from '@/shared/components/icon'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'

const ProfileEdit = () => {
  const router = useRouter()

  return (
    <>
      <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
        <button className="justify-self-start" onClick={() => router.back()}>
          <Icon name="arrow-left" className="size-[24px]" />
        </button>
        <Text typography="subtitle2-medium" className="center">
          계정 정보
        </Text>
      </header>

      <main className="flex h-[calc(100dvh-54px-88px)] w-full flex-col overflow-y-auto">
        <div className="flex-center h-fit w-full pb-[44px] pt-[24px]"></div>
      </main>
    </>
  )
}

export default ProfileEdit
