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
import { useDynamicThemeColor } from '@/shared/hooks/use-dynamic-theme-color'

// Header 컴포넌트
const Header = () => {
  useDynamicThemeColor('#F5F7F9')
  const { data } = useDirectories()
  const { selectedDirectory } = useDirectoryContext()
  const { isSelectMode, setIsSelectMode, checkDoc } = useDocumentContext()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleClickHeader = (): void => {
    if (isDrawerOpen) {
      setIsDrawerOpen(false)
    }
  }

  const handleClickAll = () => {
    if (checkDoc.isAllChecked()) {
      checkDoc.unCheckAll()
    } else {
      checkDoc.checkAll()
    }
  }

  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]')

    if (metaTag) {
      if (isDrawerOpen) {
        metaTag.setAttribute('content', '#ffffff')
      } else {
        metaTag.setAttribute('content', '#F5F7F9')
      }
    }
  }, [isDrawerOpen])

  return (
    <>
      <header
        onClick={handleClickHeader}
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

              <button onClick={handleClickAll}>
                <Text as="span" typography="button4" className="text-button-text-primary">
                  {checkDoc.isAllChecked() ? '전체 해제' : '전체 선택'}
                </Text>
              </button>
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
  directories: Directory.Item[]
}

const DirectorySelectDrawer = ({ isDrawerOpen, setIsDrawerOpen, directories }: Props) => {
  const [openCreateDirectory, setOpenCreateDirectory] = useState(false)
  const {
    selectedDirectory,
    selectedDirectoryId,
    selectDirectoryId,
    globalDirectoryId,
    totalDocsCount,
  } = useDirectoryContext()
  const { setButtonHidden } = useDocumentContext()

  useEffect(() => {
    if (isDrawerOpen) {
      setButtonHidden(true)
    } else {
      setButtonHidden(false)
    }
  }, [isDrawerOpen, setButtonHidden])

  const handleDirectorySelect = (id: number | null) => {
    const directoryId = id === globalDirectoryId ? null : id

    selectDirectoryId(directoryId)
    setIsDrawerOpen(false)
  }

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="top">
        <DrawerTrigger asChild className="cursor-pointer">
          <div className="flex size-fit items-center">
            <h2 className="mr-[8px] text-title2">
              {selectedDirectory
                ? `${selectedDirectory.emoji ?? ''} ${
                    selectedDirectory.tag === 'DEFAULT' ? '전체 노트' : selectedDirectory.name
                  }`
                : '전체 노트'}
            </h2>
            <Icon name="chevron-down" className="size-[20px]"></Icon>
          </div>
        </DrawerTrigger>

        <DrawerContent
          className="z-[19] mx-auto mt-[54px] max-w-mobile"
          overlayProps={{ className: 'z-[19] bg-black/60 max-w-mobile mx-auto' }}
          hideSidebar
        >
          <DrawerTitle></DrawerTitle>
          <div className="flex h-fit flex-col bg-background-base-01">
            <div className="border-b border-border-divider">
              <div className="mb-[11px] mt-[24px] flex max-h-[220px] flex-col overflow-y-auto px-[18px]">
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
                        directory.tag === 'DEFAULT' &&
                          !selectedDirectoryId &&
                          'text-text-accent font-bold',
                        directory.id === selectedDirectoryId && 'text-text-accent font-bold'
                      )}
                    >
                      {`${directory.emoji ?? ''} ${
                        directory.tag === 'DEFAULT' ? '전체 노트' : directory.name
                      }`}
                    </Text>
                    <Text as="span" typography="text1-medium" className="text-text-caption">
                      노트 {directory.tag === 'DEFAULT' ? totalDocsCount : directory.documentCount}
                      개
                    </Text>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setOpenCreateDirectory(true)}
              className="my-[7px] flex items-center px-[20px] py-[10px]"
            >
              <Icon name="plus-circle" className="mr-[16px]" />
              폴더 추가
            </button>
          </div>
        </DrawerContent>
      </Drawer>

      <CreateDirectoryDialog open={openCreateDirectory} onOpenChange={setOpenCreateDirectory} />
    </>
  )
}
