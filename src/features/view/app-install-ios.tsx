import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import Image from 'next/image'

const AppInstallIos = () => {
  return (
    <main className="flex h-dvh w-dvw max-w-mobile flex-col items-center overflow-y-auto bg-background-base-02 px-[16px] pb-[65px] pt-[32px]">
      <Text typography="subtitle2-medium" color="secondary" className="text-center">
        스토어에 방문할 필요 없이 <br />
        3초만에 다운로드 받아보세요
      </Text>

      <div className="flex-center mt-[46px] size-[130px] shrink-0 rounded-[30.59px] bg-background-base-01">
        <Icon name="picktoss-color" className="size-[73.41px]" />
      </div>

      <Icon name="logo" className="mt-[12px] w-[110px] shrink-0" />

      <Image
        src={'/images/ios-install-info-browser-button.png'}
        alt=""
        width={259}
        height={76}
        className="mt-[45.15px]"
      />

      <Image
        src={'/images/ios-install-info-add-home.png'}
        alt=""
        width={329}
        height={352}
        className="mt-[18px]"
      />

      <Image
        src={'/images/ios-install-info-set-application.png'}
        alt=""
        width={259}
        height={202}
        className="mt-[29px]"
      />
    </main>
  )
}

export default AppInstallIos
