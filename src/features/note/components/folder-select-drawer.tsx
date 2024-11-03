/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Icon from '@/shared/components/custom/icon'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'

// MoveNoteDrawer 컴포넌트
const FolderSelectDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFolderId, setSelectedFolderId] = useState('0')

  // 목데이터
  const folderList = [
    {
      id: '0',
      folderName: '📊 전공 공부',
      noteAmount: 3,
    },
    {
      id: '1',
      folderName: '📊 전공 공부',
      noteAmount: 12,
    },
    {
      id: '2',
      folderName: '📊 전공 공부',
      noteAmount: 15,
    },
  ]

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="rounded-full bg-background-base-02 px-[16px] py-[5px]">
          📊 전공 공부
        </button>
      </DrawerTrigger>

      <DrawerContent
        overlayProps={{ className: 'max-w-mobile mx-auto' }}
        className="mx-auto flex h-[80dvh] max-w-mobile flex-col rounded-t-[20px]"
      >
        <div className="mt-[16px] flex w-full items-center justify-between px-[18px]">
          <DrawerTitle className="text-title3">폴더 선택</DrawerTitle>
          <DrawerClose asChild>
            <button className="text-text-primary" onClick={() => setIsOpen(false)}>
              <Icon name="cancel" className="size-[24px]"></Icon>
            </button>
          </DrawerClose>
        </div>

        <div className="flex h-[calc(100%-52px)] w-full flex-col bg-background-base-01">
          <div className="flex max-h-[calc(100%-58px)] flex-col border-b border-border-divider">
            <DrawerTitle className="mt-[24px] flex items-center justify-between px-[18px]">
              <Text as="span" typography="subtitle2-medium">
                전체 노트
              </Text>
              <Text as="span" typography="text1-medium" className="text-text-caption">
                노트 30개
              </Text>
            </DrawerTitle>
            <div className="mb-[11px] mt-[9px] flex grow flex-col overflow-y-auto px-[18px]">
              {/* 폴더 개수만큼 렌더링 */}
              {folderList.map((folder) => (
                <button key={folder.id} className="flex items-center justify-between py-[10px]">
                  <Text
                    as="span"
                    typography="subtitle2-medium"
                    className={cn(folder.id === selectedFolderId && 'text-text-accent font-bold')}
                  >
                    {folder.folderName}
                  </Text>
                  <Text as="span" typography="text1-medium" className="text-text-caption">
                    노트 {folder.noteAmount}개
                  </Text>
                </button>
              ))}
            </div>
          </div>
          <button className="my-[7px] flex items-center px-[20px] py-[10px]">
            <Icon name="plus-circle" className="mr-[16px]" />
            폴더 추가
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default FolderSelectDrawer
