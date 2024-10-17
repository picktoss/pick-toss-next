'use client'

import Icon, { IconProps } from '@/shared/components/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'

// Header 컴포넌트
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuItems = [
    { key: 'download', label: 'docx로 퀴즈 다운로드', iconName: 'download' },
    { key: 'move', label: '노트 이동', iconName: 'move' },
    { key: 'delete', label: '노트 삭제', iconName: 'bin' },
  ]

  return (
    <>
      <header>
        <div
          className={cn(
            'fixed right-1/2 top-0 z-20 flex h-[54px] w-full max-w-[430px] translate-x-1/2 bg-background-base-01 px-[16px]'
          )}
        >
          <div className="flex size-full items-center justify-between">
            <div className="flex items-center">
              <button>
                <Icon name="cancel" className="size-[24px]" />
              </button>
              {/* 스크롤을 내려 제목이 뷰포트에서 사라지면 생길 텍스트 */}
              {/* <h2 className="ml-[16px] text-text1-medium">최근 이슈</h2> */}
            </div>

            <div className="flex">
              <Icon name="star" className="mr-[4px] size-[16px]" />
              <Text as="span" typography="subtitle2-medium">
                130
              </Text>
              <button className="ml-[14px]">
                <Icon name="write-line" className="size-[24px]" />
                {/* 노션일 경우 아래 아이콘 렌더링 */}
                {/* <Icon name="refresh" /> */}
              </button>

              {/* menu */}
              <DropdownMenu onOpenChange={(open) => setIsMenuOpen(open)}>
                <DropdownMenuTrigger
                  className={cn('ml-[16px]', isMenuOpen && 'text-icon-disabled')}
                >
                  <Icon name="menu-dots" className="size-[24px]" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-background-base-01 p-0">
                  {menuItems.map((menuItem, index) => (
                    <DropdownMenuItem
                      key={menuItem.key}
                      className={cn(
                        'border-t border-border-divider w-[240px] px-[20px] py-[16px]',
                        index === 0 && 'border-none',
                        menuItem.key === 'delete' && 'text-text-critical'
                      )}
                      onClick={() => alert('clicked' + menuItem.label)}
                    >
                      <Text
                        key={menuItem.key}
                        typography="subtitle2-medium"
                        className="flex w-full items-center justify-between"
                      >
                        {menuItem.label}
                        <Icon name={menuItem.iconName as IconProps['name']} />
                      </Text>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* data: 노트 제목, 문제 수, 글자 수, 마지막 수정 날짜 */}
        <div className="mt-[54px] px-[16px] pb-[18px] pt-[12px]">
          <h2 className="mb-[8px] text-title2">최근 이슈</h2>
          <div className="flex items-center text-text1-medium text-text-sub">
            <Text as="span">28문제</Text>
            <Icon name="middle-dot" className="mx-[8px]" />
            <Text as="span">2382자</Text>
            <Text as="span" typography="text1-regular" className="ml-[12px] text-text-caption">
              마지막 수정: 3일 전
            </Text>
            {/* 노션일 경우 아래 렌더링 */}
            {/* <Text
              typography="text1-regular"
              className="ml-[12px] flex items-center text-text-caption"
            >
              <Icon name="notion" className="mr-[4px] size-[19px]" />
              마지막 동기화: 3일 전
            </Text> */}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
