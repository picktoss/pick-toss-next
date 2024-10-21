interface Props {
  children: React.ReactNode
}

const FixedBottom = ({ children }: Props) => {
  return (
    <>
      <div className="pb-[100px]" />
      <div className="fixed bottom-0 z-50 h-[100px] w-full max-w-mobile bg-white px-[16px] pt-[12px]">
        {children}
      </div>
    </>
  )
}

export default FixedBottom
