import { Button } from '@/shared/components/ui/button'

const FixedBottom = () => {
  // todo: 선택한 노트가 하나도 없을 경우 '저장하기' 버튼 disabled
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
