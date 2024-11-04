import { Button } from '../ui/button'

interface Props {
  buttonA: { label: string; className: HTMLElement['className'] }
  buttonB: { label: string; className: HTMLElement['className'] }
}

const TwoRatioButton = ({ buttonA, buttonB }: Props) => {
  return (
    <div className="flex h-fit w-full gap-[6px] pb-[36px] pt-[12px]">
      <Button variant={'largeRound'} colors={'tertiary'} className={buttonA.className}>
        {buttonA.label}
      </Button>
      <Button variant={'largeRound'} colors={'primary'} className={buttonB.className}>
        {buttonB.label}
      </Button>
    </div>
  )
}

export default TwoRatioButton
