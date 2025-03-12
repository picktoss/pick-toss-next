import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import Image from 'next/image'

const AppInstallIos = () => {
  return (
    <main className="flex h-dvh w-dvw max-w-mobile flex-col items-center overflow-y-auto bg-background-base-02 px-[16px] pb-[65px] pt-[32px]">
      <Text typography="subtitle1-bold" color="secondary" className="text-center">
        스토어에 방문할 필요 없이 <br />
        3초만에 다운로드 받아보세요
      </Text>

      <div className="flex-center mt-[40px] size-[130px] shrink-0 rounded-[30.59px] bg-background-base-01">
        <Icon name="picktoss-color" className="size-[73.41px]" />
      </div>

      <Icon name="logo" className="mt-[12px] w-[110px] shrink-0" />

      <div className="mt-[40px] flex w-[271px] flex-col items-center gap-[32px]">
        <div className="flex w-full items-center gap-[8px]">
          <div className="flex-center size-[24px] rounded-[4px] bg-[var(--color-orange-200)]">
            <Text as={'span'} typography="text1-bold" color="accent">
              1
            </Text>
          </div>
          <div className="flex items-center">
            <Icon name="ios-share" className="mr-[4px] size-[24px] text-[#4C5052]" />
            <Text typography="subtitle2-bold" color="secondary">
              버튼 누르기
            </Text>
          </div>
        </div>

        <div className="flex-center flex-col gap-[13px]">
          <Text typography="text1-medium" color="sub">
            Safari: 브라우저 하단
          </Text>
          <Image
            src={'/images/ios-install-info-browser-button-safari.png'}
            alt=""
            width={261}
            height={46}
          />
        </div>

        <div className="flex-center flex-col gap-[13px]">
          <Text typography="text1-medium" color="sub">
            Chrome: 브라우저 우측 상단
          </Text>
          <Image
            src={'/images/ios-install-info-browser-button-chrome.png'}
            alt=""
            width={245}
            height={51}
          />
        </div>
      </div>

      <div className="mt-[63px] flex w-[271px] flex-col items-center gap-[27px]">
        <div className="flex w-full items-center gap-[8px]">
          <div className="flex-center size-[24px] rounded-[4px] bg-[var(--color-orange-200)]">
            <Text as={'span'} typography="text1-bold" color="accent">
              2
            </Text>
          </div>
          <Text typography="subtitle2-bold" color="secondary">
            {`'홈 화면에 추가' 선택`}
          </Text>
        </div>

        <Image src={'/images/ios-install-info-add-home.png'} alt="" width={276} height={121} />
      </div>

      <div className="mt-[48px] flex w-[271px] flex-col items-center gap-[27px]">
        <div className="flex w-full items-center gap-[8px]">
          <div className="flex-center size-[24px] rounded-[4px] bg-[var(--color-orange-200)]">
            <Text as={'span'} typography="text1-bold" color="accent">
              3
            </Text>
          </div>
          <Text typography="subtitle2-bold" color="secondary">
            추가하면 다운로드 완료!
          </Text>
        </div>

        <Image
          src={'/images/ios-install-info-set-application.png'}
          alt=""
          width={255}
          height={80}
        />
      </div>
    </main>
  )
}

export default AppInstallIos
