'use client'

import Text from '@/shared/components/ui/text'
import { Button } from '@/shared/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import Label from '@/shared/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'
import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import { useDocumentContext } from '../../contexts/document-context'
import { useMoveDocument } from '@/requests/document/hooks'
import useDrawerScrollLock from '@/shared/hooks/use-drawer-scroll-lock'
import { createPortal } from 'react-dom'

interface Props {
  triggerComponent: React.ReactNode
  documentId?: number
  resetSwipe?: () => void
}

// MoveDocumentDrawer 컴포넌트
const MoveDocumentDrawer = ({ triggerComponent, documentId, resetSwipe }: Props) => {
  const {
    directories,
    globalDirectoryId,
    selectedDirectoryId: presentDirectoryId,
  } = useDirectoryContext()
  const { checkDoc, setIsSelectMode, sortOption } = useDocumentContext()
  const [selectedDirectoryId, setSelectedDirectoryId] = useState<number | null>(globalDirectoryId)
  const [isOpen, setIsOpen] = useState(false)

  const params =
    presentDirectoryId !== null
      ? { directoryId: String(presentDirectoryId), sortOption }
      : { sortOption }

  const { mutate: moveDocumentMutation } = useMoveDocument(params)

  // iOS Safari Drawer & Scroll 관련 버그 해결
  useDrawerScrollLock(isOpen)

  const handleClickMove = () => {
    const documentIds = documentId ? [documentId] : checkDoc.getCheckedIds().map((id) => Number(id))

    if (documentIds.length === 0 || !selectedDirectoryId) return

    const requestBody = {
      documentIds,
      directoryId: selectedDirectoryId,
    }

    moveDocumentMutation(requestBody, {
      onSuccess: () => {
        setIsOpen(false)
        setIsSelectMode(false)
        resetSwipe && resetSwipe()
      },
    })
  }

  return (
    <>
      {/* iOS Safari Drawer & Scroll 관련 버그 해결: Overlay 직접 구현 */}
      {isOpen &&
        createPortal(
          <div
            className="fixed left-0 top-0 z-50 h-dvh w-dvw"
            onClick={() => {
              if (isOpen) {
                setIsOpen(false)
              }
            }}
          >
            <div className="mx-auto h-dvh max-w-mobile bg-black opacity-80" />
          </div>,
          document.body
        )}

      <Drawer open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <DrawerTrigger asChild>{triggerComponent}</DrawerTrigger>

        <DrawerContent
          overlayProps={{ className: 'max-w-mobile mx-auto' }}
          className="mx-auto h-[80dvh] max-w-mobile rounded-t-[20px]"
        >
          <div className="mt-[24px] flex h-[calc(100%-154px)] w-full flex-col px-[18px]">
            <DrawerTitle className="text-title3">다른 폴더로 이동</DrawerTitle>

            <Text typography="text1-medium" className="mt-[8px] text-text-sub">
              노트를 이동시킬 폴더를 선택해주세요.
            </Text>

            <RadioGroup
              className="mt-[24px] flex grow flex-col gap-1 overflow-y-auto"
              defaultValue={String(selectedDirectoryId)}
              onValueChange={(value) => setSelectedDirectoryId(Number(value))}
            >
              {/* 폴더 개수만큼 렌더링 */}
              {directories.map((directory) => (
                <div key={directory.id} className="flex items-center py-[10px]">
                  <RadioGroupItem
                    value={String(directory.id)}
                    id={String(directory.id)}
                    className={cn(
                      'mr-[12px]',
                      selectedDirectoryId === directory.id && 'bg-fill-primary-orange border-none'
                    )}
                  />
                  <Label
                    htmlFor={String(directory.id)}
                    className="cursor-pointer text-subtitle2-medium"
                  >
                    {directory.emoji ?? ''}{' '}
                    {directory.tag === 'DEFAULT' ? '전체 노트' : directory.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <DrawerFooter className="mt-[5px]">
            <Button variant={'largeRound'} className="w-full" onClick={handleClickMove}>
              이동하기
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MoveDocumentDrawer
