import { Button } from '@/shared/components/ui/button'

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
    </div>
  )
}

export default Home
