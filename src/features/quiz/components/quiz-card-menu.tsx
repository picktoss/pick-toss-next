'use client'

import Icon from '@/shared/components/custom/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import QuizNoteDialog from '@/features/quiz/components/quiz-note-dialog'
import { MouseEvent, useState } from 'react'
import AddCollectionDrawer from '../../collection/components/add-collection-drawer'
import NoCollectionDialog from '../../collection/components/no-collection-dialog'

const QuizCardMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOpenCollection, setIsOpenCollection] = useState(false)

  // 임시
  const isEmptyCollection = false

  const openMakeCollectionDialog = (e: MouseEvent) => {
    e.preventDefault()
    setIsOpenCollection(true)
  }

  return (
    <>
      {/* menu */}
      <DropdownMenu onOpenChange={(open) => setIsMenuOpen(open)}>
        <DropdownMenuTrigger className={cn('ml-[16px]', isMenuOpen && 'text-icon-disabled')}>
          <Icon name="menu-dots" className="size-[24px]" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="bg-background-base-01 p-0">
          {/* 컬렉션에 추가 */}
          <AddCollectionDrawer
            triggerComponent={
              <DropdownMenuItem
                className={cn('border-none w-[240px] px-[20px] py-[16px]')}
                onClick={isEmptyCollection ? (e) => openMakeCollectionDialog(e) : () => {}}
                onSelect={(e) => e.preventDefault()}
              >
                <Text
                  typography="subtitle2-medium"
                  className="flex w-full items-center justify-between"
                >
                  컬렉션에 추가
                  <Icon name="book-mark" className="size-[20px]" />
                </Text>
              </DropdownMenuItem>
            }
          />

          <NoCollectionDialog isOpen={isOpenCollection} onOpenChange={setIsOpenCollection} />

          {/* 문서 삭제 */}
          <QuizNoteDialog
            triggerComponent={
              <DropdownMenuItem
                className={cn(
                  'border-t border-border-divider w-[240px] px-[20px] py-[16px] text-text-critical'
                )}
                onSelect={(e) => e.preventDefault()}
              >
                <Text
                  typography="subtitle2-medium"
                  className="flex w-full items-center justify-between"
                >
                  문제 삭제
                  <Icon name="bin" className="size-[20px]" />
                </Text>
              </DropdownMenuItem>
            }
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default QuizCardMenu
