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
import QuizNoteDialog from '@/views/shared/quiz-note-dialog'
import { useState } from 'react'

const QuizCardMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const menuItems = [
    { key: 'add-collection', label: '컬렉션에 추가', iconName: 'book-mark' },
    { key: 'delete', label: '문제 삭제', iconName: 'bin' },
  ]

  const handleClickMenuItem = (menuItemKey: string) => {
    if (menuItemKey === 'delete') {
      setIsOpenDelete(true)
    }
    if (menuItemKey === 'add-collection') {
      alert('clicked ' + menuItemKey)
    }
  }

  return (
    <>
      {/* menu */}
      <DropdownMenu onOpenChange={(open) => setIsMenuOpen(open)}>
        <DropdownMenuTrigger className={cn('ml-[16px]', isMenuOpen && 'text-icon-disabled')}>
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
              onClick={() => handleClickMenuItem(menuItem.key)}
            >
              <Text
                key={menuItem.key}
                typography="subtitle2-medium"
                className="flex w-full items-center justify-between"
              >
                {menuItem.label}
                <Icon name={menuItem.iconName as IconProps['name']} className="size-[20px]" />
              </Text>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <QuizNoteDialog
        open={isOpenDelete}
        onOpenChange={setIsOpenDelete}
        title={'문제를 삭제할까요?'}
        content={
          // data : 해당 폴더 이름, 노트 개수 필요
          <Text typography="text1-medium">
            삭제한 문제는 다시 복구할 수 없으며, <br />
            해당 문제가 컬렉션에 포함되어 있을 경우, <br />
            컬렉션에서도 제거됩니다.
          </Text>
        }
        onConfirm={() => {}}
        confirmText="문제 삭제"
      />
    </>
  )
}

export default QuizCardMenu
