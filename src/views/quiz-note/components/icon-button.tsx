'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Icon, { IconProps } from '@/shared/components/icon'
import { menuItems, sortItems } from '../constants/dropdown-menu'
import { cn } from '@/shared/lib/utils'
import Text from '@/shared/components/ui/text'
import { useQuizNoteContext } from '../context/quiz-note-context'
import QuizNoteDialog from './quiz-note-dialog'
import { useState } from 'react'
import Link from 'next/link'

// IconButton 컴포넌트
const IconButton = ({ iconName }: { iconName: IconProps['name'] }) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const { setIsSelectMode } = useQuizNoteContext()

  const handleClickMenuItem = (key: string) => {
    if (key === 'select') setIsSelectMode(true)
    if (key === 'edit') setIsOpenEdit(true)
    if (key === 'delete') setIsOpenDelete(true)
  }

  return (
    <>
      {iconName === 'search' ? (
        <Link href={'/note/search'}>
          <Icon name={iconName} className="size-[24px]"></Icon>
        </Link>
      ) : (
        <>
          <DropdownMenu key={iconName}>
            <DropdownMenuTrigger>
              <Icon name={iconName} className="size-[24px]"></Icon>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-background-base-01 p-0">
              {iconName === 'menu-dots' &&
                menuItems.map((menuItem, index) => (
                  <DropdownMenuItem
                    key={menuItem.key}
                    className={cn(
                      'border-t border-border-divider w-[240px] px-[20px] py-[16px]',
                      index === 0 && 'border-none'
                    )}
                    onClick={() => handleClickMenuItem(menuItem.key)}
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

              {iconName === 'sort' &&
                sortItems.map((menuItem, index) => (
                  <DropdownMenuItem
                    key={menuItem.key}
                    className={cn(
                      'border-t border-border-divider w-[240px] px-[20px] py-[16px]',
                      index === 0 && 'border-none'
                    )}
                    onClick={() => alert('clicked ' + menuItem.label)}
                  >
                    <Text
                      key={menuItem.key}
                      typography="subtitle2-medium"
                      className="flex w-full items-center justify-between"
                    >
                      {menuItem.label}
                    </Text>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <QuizNoteDialog
            open={isOpenEdit}
            onOpenChange={setIsOpenEdit}
            title={'폴더 이름 바꾸기'}
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
      )}
    </>
  )
}

export default IconButton
