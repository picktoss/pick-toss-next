'use client'

import Text from '@/shared/components/text'
import Icon from '@/shared/components/v3/icon'
import { useQuizNoteContext } from '../context/quiz-note-context'
import { cn } from '@/shared/lib/utils'
import React, { useEffect } from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer'

interface Props {
  isDrawerOpen: boolean
  setIsDrawerOpen: (value: boolean) => void
}

// FolderSelectDrawer 컴포넌트
const FolderSelectDrawer = ({ isDrawerOpen, setIsDrawerOpen }: Props) => {
  const { selectedFolderId, setDialogState, setButtonHidden } = useQuizNoteContext()

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

  useEffect(() => {
    if (isDrawerOpen) {
      setButtonHidden(true)
    } else {
      setButtonHidden(false)
    }
  }, [isDrawerOpen, setButtonHidden])

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="top">
        <DrawerTrigger asChild>
          <button className="flex size-fit items-center">
            <h2 className="mr-[8px] text-title2">전체 노트</h2>
            <Icon name="chevron-down" className="size-[20px]"></Icon>
          </button>
        </DrawerTrigger>

        <DrawerContent
          className="z-[19] mt-[54px]"
          overlayProps={{ className: 'z-[19] bg-black/60' }}
          hideSidebar
        >
          <div className="flex h-fit flex-col bg-background-base-01">
            <div className="border-b border-border-divider">
              <div className="mt-[24px] flex items-center justify-between px-[18px]">
                <Text as="span" typography="subtitle2-medium">
                  전체 노트
                </Text>
                <Text as="span" typography="text1-medium" className="text-text-caption">
                  노트 30개
                </Text>
              </div>
              <div className="mb-[11px] mt-[9px] flex max-h-[220px] flex-col overflow-y-scroll px-[18px]">
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
            <button
              className="my-[7px] flex items-center px-[20px] py-[10px]"
              onClick={() => setDialogState({ isOpen: true, type: 'create' })}
            >
              <Icon name="plus-circle" className="mr-[16px]" />
              폴더 추가
            </button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default FolderSelectDrawer
