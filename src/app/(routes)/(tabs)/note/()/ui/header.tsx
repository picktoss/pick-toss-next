'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useEffect, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import SortIconBtn from '@/features/note/components/sort-icon-button'
import { useQuizNoteContext } from '@/features/note/contexts/quiz-note-context'
import FolderMenuDots from '@/features/note/components/folder-menu-dots'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/shared/components/ui/drawer'
import SetFolderNameDialog from '@/features/note/components/set-folder-name-dialog'

// Header 컴포넌트
const Header = () => {
  const { setSelectedFolderId, isSelectMode, setIsSelectMode } = useQuizNoteContext()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    setSelectedFolderId('0')
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed right-1/2 top-0 z-20 translate-x-1/2 flex h-[54px] w-full max-w-[430px] flex-col justify-end bg-background-base-02 px-[16px] transition-all',
          isDrawerOpen && 'bg-background-base-01'
        )}
      >
        <div className="flex size-full items-center justify-between">
          {isSelectMode ? (
            <>
              <Icon name="cancel" className="size-[24px]" onClick={() => setIsSelectMode(false)} />
              <Text as="span" typography="subtitle2-medium" className="ml-[35px]">
                전공 공부
              </Text>
              <Text as="span" typography="button4" className="text-button-text-primary">
                전체 선택
              </Text>
            </>
          ) : (
            <>
              <FolderSelectDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />

              {!isDrawerOpen && (
                <div className="flex size-fit items-center gap-[16px]">
                  <Link href="/note/search">
                    <Icon name="search" className="size-[24px]" />
                  </Link>

                  <SortIconBtn />

                  <FolderMenuDots />
                </div>
              )}
            </>
          )}
        </div>
      </header>
    </>
  )
}

export default Header

// 노트 메인 페이지에 사용되는 folder-select-drawer
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

interface Props {
  isDrawerOpen: boolean
  setIsDrawerOpen: (value: boolean) => void
}

const FolderSelectDrawer = ({ isDrawerOpen, setIsDrawerOpen }: Props) => {
  const { selectedFolderId, setButtonHidden } = useQuizNoteContext()

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
          className="z-[19] mx-auto mt-[54px] max-w-mobile"
          overlayProps={{ className: 'z-[19] bg-black/60 max-w-mobile mx-auto' }}
          hideSidebar
        >
          <div className="flex h-fit flex-col bg-background-base-01">
            <div className="border-b border-border-divider">
              <DrawerTitle className="mt-[24px] flex items-center justify-between px-[18px]">
                <Text as="span" typography="subtitle2-medium">
                  전체 노트
                </Text>
                <Text as="span" typography="text1-medium" className="text-text-caption">
                  노트 30개
                </Text>
              </DrawerTitle>

              <div className="mb-[11px] mt-[9px] flex max-h-[220px] flex-col overflow-y-auto px-[18px]">
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

            <SetFolderNameDialog
              triggerComponent={
                <button className="my-[7px] flex items-center px-[20px] py-[10px]">
                  <Icon name="plus-circle" className="mr-[16px]" />
                  폴더 추가
                </button>
              }
              title={'폴더 만들기'}
              onConfirm={() => {}}
              confirmText={'만들기'}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
