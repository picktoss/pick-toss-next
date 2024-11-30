import GoBackButton from '@/shared/components/custom/go-back-button'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import Image from 'next/image'
import Link from 'next/link'

const EmptyBombList = () => {
  return (
    <div className="flex h-[70dvh] min-h-fit w-full flex-col items-center">
      <header className="h-[54px] w-full py-[16px]">
        <GoBackButton icon="cancel" />
      </header>

      <div className="flex-center grow flex-col">
        <Image
          src={'/images/empty-bomb.png'}
          alt=""
          width={80.31}
          height={70.54}
          className="mb-[20px]"
        />

        <Text typography="text1-medium" color="sub" className="mb-[32px] text-center">
          쌓인 오답이 없어요 <br /> 내 노트에서 더 많은 퀴즈를 풀어보세요
        </Text>

        <Link href={'/document'}>
          <Button variant={'mediumRound'} className="px-[24px]">
            퀴즈노트 바로가기
          </Button>
        </Link>
      </div>

      <div className="relative mb-[11px]">
        <Text typography="subtitle1-bold" color="primary-inverse" className="center">
          0
        </Text>
        <Image src={'/images/count-device.png'} alt="" width={79} height={38} />
      </div>
    </div>
  )
}

export default EmptyBombList
