'use client'

import CreateDirectoryDialog from '@/features/directory/components/create-directory-dialog'
import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
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
import React, { useState } from 'react'

interface Props {
  trigger: React.ReactNode
}

const DirectorySelectDrawer = ({ trigger }: Props) => {
  const [open, setOpen] = useState(false)
  const [openCreateDirectory, setOpenCreateDirectory] = useState(false)
  const { directories, selectDirectoryId, selectedDirectoryId, totalDocsCount } =
    useDirectoryContext()

  const handleDirectorySelect = (id: number) => {
    selectDirectoryId(id)
    setOpen(false)
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>

        <DrawerContent
          overlayProps={{ className: 'max-w-mobile mx-auto' }}
          className="mx-auto flex h-[80dvh] max-w-mobile flex-col rounded-t-[20px]"
        >
          <div className="mt-[16px] flex w-full items-center justify-between px-[18px]">
            <DrawerTitle className="text-title3">폴더 선택</DrawerTitle>
            <DrawerClose asChild>
              <button className="text-text-primary">
                <Icon name="cancel" className="size-[24px]"></Icon>
              </button>
            </DrawerClose>
          </div>

          <div className="flex h-[calc(100%-52px)] w-full flex-col bg-background-base-01">
            <div className="flex max-h-[calc(100%-58px)] flex-col border-b border-border-divider">
              <div className="mb-[11px] mt-[24px] flex grow flex-col overflow-y-auto px-[18px]">
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
                      {directory.emoji ?? ''}{' '}
                      {directory.tag === 'DEFAULT' ? '전체 노트' : directory.name}
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

export default DirectorySelectDrawer
