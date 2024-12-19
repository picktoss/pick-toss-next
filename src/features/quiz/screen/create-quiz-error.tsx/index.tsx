import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import Image from 'next/image'

interface Props {
  setCreateError: (error: string | null) => void
}

const CreateQuizError = ({ setCreateError }: Props) => {
  return (
    <div className="center flex-center z-30 h-dvh w-dvw max-w-mobile flex-col bg-background-base-01">
      <Image src={'/images/error.png'} alt="" width={204} height={128} />
      <div className="mt-[22.4px] flex flex-col items-center gap-[10px] lg:mt-[15.7px] lg:gap-[16px] lg:py-0">
        <Text typography="title3">퀴즈를 만드는 중 문제가 생겼어요</Text>
        <Text typography="text1-medium" color="sub" className="px-[45px] text-center">
          아래 내용을 확인하신 후 다시 시도해보세요
        </Text>
      </div>
      <div className="flex w-full max-w-[480px] flex-col px-[43px]">
        <div className="my-[32px] flex flex-col gap-[8px] rounded-[12px] border border-border-divider p-[20px]">
          <Text typography="text1-bold" color="secondary">
            퀴즈 만들기 Tip
          </Text>

          <Text typography="text1-medium" color="sub">
            · 노트에 더 많은 내용을 작성해보세요 <br />
            · 같은 내용이 반복되지 않도록 해주세요 <br />· 충분한 정보가 있는지 확인해주세요
          </Text>
        </div>
        <div className="flex flex-col gap-[8px] px-[15px]">
          <Button onClick={() => setCreateError(null)} variant={'mediumRound'} className="w-full">
            노트 수정하러 가기
          </Button>
          <Button variant={'mediumRound'} colors={'secondary'} className="w-full">
            퀴즈 다시 만들기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateQuizError
