'use client'

import Text from '@/shared/components/ui/text'
import { Button } from '@/shared/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import Label from '@/shared/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import Icon from '@/shared/components/icon'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'

// MoveNoteDrawer 컴포넌트
const MoveNoteDrawer = ({ triggerComponent }: { triggerComponent: JSX.Element }) => {
  const [selectedFolderId, setSelectedFolderId] = useState('all')

  // 목데이터
  const folderList = [
    {
      id: '0',
      folderName: '📊 전공 공부',
    },
    {
      id: '1',
      folderName: '📊 전공 공부',
    },
    {
      id: '2',
      folderName: '📊 전공 공부',
    },
  ]

  return (
    <Drawer>
      <DrawerTrigger asChild>{triggerComponent}</DrawerTrigger>

      <DrawerContent className="rounded-t-[16px]">
        <div className="my-[24px] flex h-[85dvh] flex-col items-center">
          <div className="w-full px-[18px]">
            <header className="flex items-center justify-between">
              <DrawerTitle className="text-title3">다른 폴더로 이동</DrawerTitle>

              <DrawerClose asChild>
                <button className="text-text-primary">
                  <Icon name="cancel" className="size-[24px]"></Icon>
                </button>
              </DrawerClose>
            </header>

            <Text typography="text1-medium" className="mt-[8px] text-text-sub">
              노트를 이동시킬 폴더를 선택해주세요.
            </Text>

            <RadioGroup
              className="mb-[11px] mt-[24px] flex flex-col gap-1"
              defaultValue={selectedFolderId}
              onValueChange={(value) => setSelectedFolderId(value)}
            >
              <div className="flex items-center py-[10px]">
                <RadioGroupItem
                  value={'all'}
                  id={'all'}
                  className={cn(
                    'mr-[12px]',
                    selectedFolderId === 'all' && 'bg-fill-primary-orange border-none'
                  )}
                />
                <Label htmlFor={'all'} className="cursor-pointer text-subtitle2-medium">
                  전체 노트
                </Label>
              </div>

              {/* 폴더 개수만큼 렌더링 */}
              {folderList.map((folder) => (
                <div key={folder.id} className="flex items-center py-[10px]">
                  <RadioGroupItem
                    value={folder.id}
                    id={folder.id}
                    className={cn(
                      'mr-[12px]',
                      selectedFolderId === folder.id && 'bg-fill-primary-orange border-none'
                    )}
                  />
                  <Label htmlFor={folder.id} className="cursor-pointer text-subtitle2-medium">
                    {folder.folderName}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button variant={'largeRound'} className="mt-[25px] w-[335px]">
            이동하기
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default MoveNoteDrawer
