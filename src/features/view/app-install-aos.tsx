'use client'

import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { useInstallPWA } from '@/shared/hooks/use-install-pwa'

const AppInstallAos = () => {
  const { handleInstallClick } = useInstallPWA()

  return (
    <main className="flex min-h-dvh w-dvw max-w-mobile flex-col items-center overflow-y-auto bg-background-base-02 px-[16px] py-[32px]">
      <Text typography="subtitle2-medium" color="secondary" className="text-center">
        스토어에 방문할 필요 없이 <br />
        3초만에 다운로드 받아보세요
      </Text>

      <div className="flex-center mt-[46px] size-[130px] rounded-[30.59px] bg-background-base-01">
        <Icon name="picktoss-color" className="size-[73.41px]" />
      </div>

      <Icon name="logo" className="mt-[12px]" />

      <Button onClick={handleInstallClick} className="mt-[66.15px]">
        앱 다운로드
      </Button>
    </main>
  )
}

export default AppInstallAos
