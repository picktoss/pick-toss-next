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

// MoveDocumentDrawer 컴포넌트
const MoveDocumentDrawer = ({ triggerComponent }: { triggerComponent: React.ReactNode }) => {
  const [selectedDirectoryId, setSelectedDirectoryId] = useState('all')

  // 목데이터
  const directoryList = [
    {
      id: '0',
      directoryName: '📊 전공 공부',
    },
    {
      id: '1',
      directoryName: '📊 전공 공부',
    },
    {
      id: '2',
      directoryName: '📊 전공 공부',
    },
  ]

  return (
    <Drawer>
      <DrawerTrigger asChild>{triggerComponent}</DrawerTrigger>

      <DrawerContent
        overlayProps={{ className: 'max-w-mobile mx-auto' }}
        className="mx-auto h-[80dvh] max-w-mobile rounded-t-[20px]"
      >
        <div className="mt-[24px] flex max-h-[calc(100%-154px)] w-full flex-col px-[18px]">
          <DrawerTitle className="text-title3">다른 폴더로 이동</DrawerTitle>

          <Text typography="text1-medium" className="mt-[8px] text-text-sub">
            노트를 이동시킬 폴더를 선택해주세요.
          </Text>

          <RadioGroup
            className="mt-[24px] flex grow flex-col gap-1 overflow-y-auto"
            defaultValue={selectedDirectoryId}
            onValueChange={(value) => setSelectedDirectoryId(value)}
          >
            <div className="flex items-center py-[10px]">
              <RadioGroupItem
                value={'all'}
                id={'all'}
                className={cn(
                  'mr-[12px]',
                  selectedDirectoryId === 'all' && 'bg-fill-primary-orange border-none'
                )}
              />
              <Label htmlFor={'all'} className="cursor-pointer text-subtitle2-medium">
                전체 노트
              </Label>
            </div>

            {/* 폴더 개수만큼 렌더링 */}
            {directoryList.map((directory) => (
              <div key={directory.id} className="flex items-center py-[10px]">
                <RadioGroupItem
                  value={directory.id}
                  id={directory.id}
                  className={cn(
                    'mr-[12px]',
                    selectedDirectoryId === directory.id && 'bg-fill-primary-orange border-none'
                  )}
                />
                <Label htmlFor={directory.id} className="cursor-pointer text-subtitle2-medium">
                  {directory.directoryName}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <DrawerFooter className="mt-[5px]">
          <Button variant={'largeRound'} className="w-full">
            이동하기
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default MoveDocumentDrawer
