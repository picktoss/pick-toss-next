import NIGHT_SKY_IMG from '@/../../public/images/star-background-white.png'
import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import Image from 'next/image'
import Link from 'next/link'

const AppInstallView = () => {
  return (
    <div
      className="fixed bottom-0 right-1/2 z-20 h-screen w-dvw max-w-mobile translate-x-1/2"
      style={{
        backgroundImage: `url(${NIGHT_SKY_IMG.src})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <header className="relative z-30 flex h-[54px] w-full items-center px-[16px]">
        <Icon name="logo" className="h-[36px] text-text-primary-inverse" />
      </header>

      <div className="flex size-full flex-col justify-between overflow-x-hidden">
        <main className="flex-center h-[calc(100vh-54px)] w-full flex-col gap-[90px] overflow-y-auto overflow-x-hidden px-[16px]">
          <div className="flex-center flex-col">
            <Image src={'/images/app.png'} alt="" width={85} height={85} />
            <Text typography="title1" color="primary-inverse" className="text-center ">
              모바일 픽토스는 <br /> 앱에서 만날 수 있어요
            </Text>
          </div>

          <div className="flex w-full flex-col gap-[8px]">
            <Text typography="text2-medium" color="accent" className="text-center">
              *컬렉션은 모바일 웹에서 풀어볼 수 있어요
            </Text>
            <Link href={'/collections'}>
              <Button colors={'secondary'} className="mb-[4px] w-full">
                컬렉션으로 이동하기
              </Button>
            </Link>
            <Button className="w-full">지금 앱에서 전부 이용하기</Button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppInstallView
