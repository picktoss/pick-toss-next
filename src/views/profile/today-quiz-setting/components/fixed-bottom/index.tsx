import { Button } from '@/shared/components/ui/button'

const FixedBottom = () => {
  return (
    <div className="flex h-fit w-full gap-[6px] pb-[36px] pt-[12px]">
      <Button variant={'largeRound'} colors={'tertiary'} className="w-[35%]">
        초기화
      </Button>
      <Button variant={'largeRound'} colors={'primary'} className="w-[65%]">
        저장하기
      </Button>
    </div>
  )
}

export default FixedBottom
