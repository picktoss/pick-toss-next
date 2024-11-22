'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useEffect, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/shared/components/ui/drawer'
import SortIconBtn from '@/features/document/components/sort-icon-button'
import DirectoryMenuDots from '@/features/directory/components/directory-menu-dots'
import GoBackButton from '@/shared/components/custom/go-back-button'
import { useDirectories } from '@/requests/directory/hooks'
import CreateDirectoryDialog from '@/features/directory/components/create-directory-dialog'
import { useDocumentContext } from '@/features/document/contexts/document-context'
import { useDirectoryContext } from '@/features/directory/contexts/directory-context'

// Header 컴포넌트
const Header = () => {
  const { data } = useDirectories()
  const { selectedDirectory } = useDirectoryContext()
  const { isSelectMode, setIsSelectMode } = useDocumentContext()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

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
              <GoBackButton icon="cancel" onClick={() => setIsSelectMode(false)} />

              <Text as="span" typography="subtitle2-medium" className="ml-[35px]">
                {selectedDirectory?.name}
              </Text>
              <Text as="span" typography="button4" className="text-button-text-primary">
                전체 선택
              </Text>
            </>
          ) : (
            <>
              <DirectorySelectDrawer
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
                directories={data?.directories || []}
              />

              {!isDrawerOpen && (
                <div className="flex size-fit items-center gap-[16px]">
                  <Link href="/document/search">
                    <Icon name="search" className="size-[24px]" />
                  </Link>

                  <SortIconBtn />

                  <DirectoryMenuDots />
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

interface Props {
  isDrawerOpen: boolean
  setIsDrawerOpen: (value: boolean) => void
  directories: Directory.List
}

const DirectorySelectDrawer = ({ isDrawerOpen, setIsDrawerOpen, directories }: Props) => {
  const { selectedDirectory, selectedDirectoryId, selectDirectoryId } = useDirectoryContext()
  const { setButtonHidden } = useDocumentContext()

  useEffect(() => {
    if (isDrawerOpen) {
      setButtonHidden(true)
    } else {
      setButtonHidden(false)
    }
  }, [isDrawerOpen, setButtonHidden])

  const handleDirectorySelect = (id: number | null) => {
    selectDirectoryId(id)
    setIsDrawerOpen(false)
  }

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="top">
        <DrawerTrigger asChild>
          <button className="flex size-fit items-center">
            <h2 className="mr-[8px] text-title2">
              {selectedDirectory
                ? `${selectedDirectory.emoji ?? '📁'} ${selectedDirectory.name}`
                : '전체 노트'}
            </h2>
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
              <button className="w-full" onClick={() => handleDirectorySelect(null)}>
                <DrawerTitle className="mt-[24px] flex items-center justify-between px-[18px]">
                  <Text as="span" typography="subtitle2-medium">
                    전체 노트
                  </Text>
                  <Text as="span" typography="text1-medium" className="text-text-caption">
                    노트 {selectedDirectory?.documentCount}개
                  </Text>
                </DrawerTitle>
              </button>

              <div className="mb-[11px] mt-[9px] flex max-h-[220px] flex-col overflow-y-auto px-[18px]">
                {/* 폴더 개수만큼 렌더링 */}
                {directories.map((directory) => (
                  <button
                    key={directory.id}
                    className="flex items-center justify-between py-[10px]"
                    onClick={() => handleDirectorySelect(directory.id)}
                  >
                    <Text
                      as="span"
                      typography="subtitle2-medium"
                      className={cn(
                        directory.id === selectedDirectoryId && 'text-text-accent font-bold'
                      )}
                    >
                      {`${directory.emoji ?? '📁'} ${directory.name}`}
                    </Text>
                    <Text as="span" typography="text1-medium" className="text-text-caption">
                      노트 {directory.documentCount}개
                    </Text>
                  </button>
                ))}
              </div>
            </div>

            <CreateDirectoryDialog />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
