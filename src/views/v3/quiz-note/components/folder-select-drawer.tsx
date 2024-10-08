'use client'

import { Drawer as MaterialDrawer } from '@material-tailwind/react'
import Text from '@/shared/components/text'
import Icon from '@/shared/components/v3/icon'
import { useQuizNoteContext } from '../context/quiz-note-context'
import { cn } from '@/shared/lib/utils'
import React, { useEffect, useRef } from 'react'

interface Props {
  isDrawerOpen: boolean
  setIsDrawerOpen: (value: boolean) => void
}

// FolderSelectDrawer 컴포넌트
const FolderSelectDrawer = ({ isDrawerOpen, setIsDrawerOpen }: Props) => {
  const { selectedFolderId, setDialogState, setButtonHidden } = useQuizNoteContext()
  const overlayRef = useRef(null)

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
      <div ref={overlayRef}></div>
      <MaterialDrawer
        placement="top"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        size={370}
        overlayRef={overlayRef}
        overlayProps={{ className: 'z-10 bg-opacity-60' }}
        transition={{ duration: 0.4 }}
        className="absolute z-10"
      >
        <div className="my-[24px] mt-[108px] flex h-fit flex-col bg-background-base-01">
          <div className="border-b border-border-divider px-[18px]">
            <div className="mt-[24px] flex items-center justify-between">
              <Text as="span" typography="subtitle2-medium">
                전체 노트
              </Text>
              <Text as="span" typography="text1-medium" className="text-text-caption">
                노트 30개
              </Text>
            </div>
            <div className="mb-[11px] mt-[9px] flex flex-col">
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
      </MaterialDrawer>
    </>
  )
}

export default FolderSelectDrawer
