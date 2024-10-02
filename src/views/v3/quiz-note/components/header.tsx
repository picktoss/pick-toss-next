import Icon from '@/shared/components/v3/icon'

const Header = () => {
  return (
    <div className="flex h-[108px] w-full flex-col justify-end">
      <div className="flex h-1/2 w-full items-center justify-between">
        {/* todo : 아래 div 클릭 시 폴더 선택 drawer 올라오기 */}
        <div className="flex size-fit items-center ">
          <h2 className="mr-[8px] text-title2">전체 노트</h2>
          <Icon name="down-chevron" className="size-[20px]"></Icon>
        </div>
        <div className="flex size-fit items-center gap-[16px]">
          <Icon name="search" className=" size-[24px]"></Icon>
          <Icon name="sort" className=" size-[24px]"></Icon>
          <Icon name="menu-dots" className="size-[24px]"></Icon>
        </div>
      </div>
    </div>
  )
}

export default Header
