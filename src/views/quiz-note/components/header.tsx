'use client'

import Icon from '@/shared/components/icon'
import { useQuizNoteContext } from '../context/quiz-note-context'
import Text from '@/shared/components/ui/text'
import { useEffect, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import FolderSelectDrawer from './folder-select-drawer'
import SortIconBtn from './sort-icon-button'
import Link from 'next/link'
import MenuDotsBtn from './menu-dots-button'

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
          isDrawerOpen && 'bg-background-base-01 max-w-screen'
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

                  <MenuDotsBtn />
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
