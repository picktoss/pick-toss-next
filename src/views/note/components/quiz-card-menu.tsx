'use client'

import Icon from '@/shared/components/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import QuizNoteDialog from '@/views/shared/quiz-note-dialog'
import { MouseEvent, useState } from 'react'
import AddCollectionDrawer from './add-collection-drawer'
import { Dialog, DialogClose, DialogContent } from '@/shared/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from '@/shared/components/ui/button'

const QuizCardMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
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

        <DropdownMenuContent className="bg-background-base-01 p-0">
          <AddCollectionDrawer
            triggerComponent={
              <DropdownMenuItem
                className={cn('border-none w-[240px] px-[20px] py-[16px]')}
                onClick={isEmptyCollection ? (e) => openMakeCollectionDialog(e) : () => {}}
                onSelect={(e) => {
                  e.preventDefault()
                }}
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

          <DropdownMenuItem
            className={cn(
              'border-t border-border-divider w-[240px] px-[20px] py-[16px] text-text-critical'
            )}
            onClick={() => setIsOpenDelete(true)}
          >
            <Text
              typography="subtitle2-medium"
              className="flex w-full items-center justify-between"
            >
              문제 삭제
              <Icon name="bin" className="size-[20px]" />
            </Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isOpenCollection} onOpenChange={setIsOpenCollection}>
        <DialogContent
          displayCloseButton={false}
          className="flex-center size-fit flex-col rounded-[20px] bg-background-base-01 px-[24px] py-[28px]"
        >
          <DialogTitle className="mb-[8px] font-suit text-title3">아직 컬렉션이 없어요</DialogTitle>
          <Text typography="text1-medium" className="mb-[36px] text-center text-text-sub">
            다른 사람들과 함께 공유할 <br />
            퀴즈 컬렉션을 만드시겠어요?
          </Text>

          <Button variant={'largeRound'} colors={'primary'} className="mb-[16px]">
            컬렉션 만들러 가기
          </Button>
          <DialogClose>다음에 만들기</DialogClose>
        </DialogContent>
      </Dialog>

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
