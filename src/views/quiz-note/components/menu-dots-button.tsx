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
import { useQuizNoteContext } from '../context/quiz-note-context'
import QuizNoteDialog from '@/views/shared/quiz-note-dialog'
import SetFolderNameContent from './set-folder-name-content'

const MenuDotsBtn = () => {
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const { setIsSelectMode } = useQuizNoteContext()

  const menuItems = [
    { key: 'select', label: '노트 선택', iconName: 'check' },
    { key: 'edit', label: '폴더 이름 바꾸기', iconName: 'write-line' },
    { key: 'delete', label: '폴더 삭제', iconName: 'bin' },
  ]

  const handleClickMenuItem = (key: string) => {
    if (key === 'select') setIsSelectMode(true)
    if (key === 'edit') setIsOpenEdit(true)
    if (key === 'delete') setIsOpenDelete(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icon name="menu-dots" className="size-[24px]"></Icon>
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
        open={isOpenEdit}
        onOpenChange={setIsOpenEdit}
        title={'폴더 이름 바꾸기'}
        content={<SetFolderNameContent />}
        onConfirm={() => {}}
        confirmText="저장"
      />
      <QuizNoteDialog
        open={isOpenDelete}
        onOpenChange={setIsOpenDelete}
        title={'폴더를 삭제할까요?'}
        content={
          // data : 해당 폴더 이름, 노트 개수 필요
          <Text typography="text1-medium">
            전공 공부 폴더와 <span className="text-text-wrong">14개의 노트</span>가 <br /> 모두
            삭제됩니다
          </Text>
        }
        onConfirm={() => {}}
        confirmText="삭제하기"
      />
    </>
  )
}

export default MenuDotsBtn
