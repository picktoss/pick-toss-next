import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import Image from 'next/image'
import Link from 'next/link'

const UnavailableInviteView = () => {
  return (
    <>
      <Image
        src={'/images/no-invite-letter.png'}
        alt=""
        width={133}
        height={92}
        className="my-[84px]"
      />

      <Text typography="title1" className="mb-[8px]">
        이런!
      </Text>

      <Text typography="title1" className="mb-[16px]">
        초대장이 사라졌어요
      </Text>

      <Text typography="text1-medium" color="sub" className="text-center">
        링크 유효기간이 만료되어, 새로운 초대 링크가 필요해요 <br />
        픽토스 PRO 무료 이용권을 받고 싶다면 <br />
        친구에게 링크를 다시 요청해보세요
      </Text>

      <Link href={'/invite/sign-up'} className="w-full max-w-[280px]">
        <Button className="mx-[5px] my-[56px] w-full max-w-[280px]">그냥 바로 가입하기</Button>
      </Link>
    </>
  )
}

export default UnavailableInviteView
