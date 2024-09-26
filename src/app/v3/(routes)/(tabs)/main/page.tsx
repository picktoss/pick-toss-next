import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { CloseCircle } from '@/shared/components/v3/icon/svg-components'

const Home = () => {
  return (
    <div className="flex flex-col gap-[10px] p-[40px]">
      {/* default variant largeRound, default color primary */}
      <Button left={<div>ㅁ</div>}>버튼명</Button>
      <Button variant="mediumIcon" colors="special">
        X
      </Button>
      <Button variant="mediumRound" colors="outlined" right={<div>ㅁ</div>}>
        버튼명
      </Button>
      <Button variant="mediumSquare" colors="primary-loading" left={<div>ㅁ</div>}>
        버튼명
      </Button>
      <Button variant="smallRound" colors="secondary" right={<div>ㅁ</div>}>
        버튼명
      </Button>
      <Button variant="smallSquare" colors="selected" left={<div>ㅁ</div>}>
        버튼명
      </Button>
      <Button variant="tinySquare" colors="tertiary">
        버튼명
      </Button>
      <Button variant="tinySquare" colors="unselected">
        버튼명
      </Button>
      <Input type="text" placeholder="입력해주세요" variant="search" />
      <Input type="text" placeholder="입력해주세요" variant="default" />
      <Input
        type="text"
        placeholder="입력해주세요"
        variant="default"
        right={<CloseCircle width="24" height="24" fill="#B6C1C9" stroke="#4C5052" />}
      />
    </div>
  )
}

export default Home
