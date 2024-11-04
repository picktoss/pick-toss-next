interface Props {
  left?: React.ReactNode
  right?: React.ReactNode
}

const BottomButtons = ({ left, right }: Props) => {
  return (
    <div className="flex h-fit w-full gap-[6px] pb-[36px] pt-[12px]">
      {left}
      {right}
    </div>
  )
}

export default BottomButtons
