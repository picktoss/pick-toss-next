import Icon, { IconProps } from '@/shared/components/v3/icon'

// Header 컴포넌트
const Header = () => {
  const iconList = ['search', 'sort', 'menu-dots'] as IconProps['name'][]

  return (
    <div className="fixed left-0 top-0 z-50 flex h-[108px] w-full flex-col justify-end px-[14px]">
      <div className="flex h-1/2 w-full items-center justify-between">
        {/* todo : 아래 div 클릭 시 폴더 선택 drawer 올라오기 */}
        <div className="flex size-fit items-center ">
          <h2 className="mr-[8px] text-title2">전체 노트</h2>
          <Icon
            name="chevron-down"
            className="size-[20px]"
            onClick={() => alert('clicked chevron-down')}
          ></Icon>
        </div>
        <div className="flex size-fit items-center gap-[16px]">
          {iconList.map((iconName) => (
            <Icon
              key={iconName}
              name={iconName}
              className=" size-[24px]"
              onClick={() => alert('clicked ' + iconName)}
            ></Icon>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
