import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import Image from 'next/image'
import Link from 'next/link'

const AvailableInviteView = ({ code }: { code: string }) => {
  return (
    <>
      <Image
        src={'/images/invite-letter.png'}
        alt=""
        width={198}
        height={210}
        className="my-[29px]"
      />

      <Text typography="title1" className="mb-[8px]">
        {'픽토스'}님이 보내신
      </Text>

      <Text typography="title1" className="mb-[16px]">
        {'픽토스'}{' '}
        <Text as="span" color="special">
          PRO
        </Text>{' '}
        무료 이용권
      </Text>

      <Text typography="text1-medium" color="sub" className="text-center">
        하루 5분으로 내가 배운 것을 기억하세요 <br />
        노트필기, 수업 기록, 저장한 자료 등 <br />
        픽토스 PRO에서는 마음껏 퀴즈로 만들 수 있어요
      </Text>

      <Link href={'/invite/sign-up' + '?code=' + code} className="w-full max-w-[280px]">
        <Button className="mx-[5px] my-[56px] w-full max-w-[280px]">바로 받기</Button>
      </Link>
    </>
  )
}

export default AvailableInviteView
