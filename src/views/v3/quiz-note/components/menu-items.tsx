// Header 내부에서 사용되는 메뉴창 관련 컴포넌트들

import Text from '@/shared/components/text'
import Icon, { IconProps } from '@/shared/components/v3/icon'
import { cn } from '@/shared/lib/utils'

// todo: 각각의 Text에 클릭 이벤트 삽입 (+ menuState 변경)
export const MenuFolderItems = () => {
  const menuItems = [
    { text: '노트 선택', iconName: 'check' },
    { text: '폴더 이름 바꾸기', iconName: 'write-line' },
    { text: '폴더 삭제', iconName: 'bin' },
  ]

  return (
    <>
      {menuItems.map((menuItem, index) => (
        <Text
          key={menuItem.text}
          className={cn(
            'flex w-[240px] justify-between items-center px-[20px] py-[16px] border-t border-border-divider',
            index === 0 && 'border-none'
          )}
          onClick={() => alert('clicked ' + menuItem.text)}
        >
          {menuItem.text}
          <Icon name={menuItem.iconName as IconProps['name']} />
        </Text>
      ))}
    </>
  )
}

export const MenuSortItems = () => {
  const menuItems = ['업로드한 날짜', '마지막으로 열어본 시간']

  return (
    <>
      {menuItems.map((menuItem, index) => (
        <Text
          key={menuItem}
          className={cn(
            'flex w-[240px] justify-between items-center px-[20px] py-[16px] border-t border-border-divider',
            index === 0 && 'border-none'
          )}
          onClick={() => alert('clicked ' + menuItem)}
        >
          {menuItem}
        </Text>
      ))}
    </>
  )
}
