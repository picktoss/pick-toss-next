import Text from '@/shared/components/text'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer'
import Icon from '@/shared/components/v3/icon'
import { useQuizNoteContext } from '../context/quiz-note-context'
import { cn } from '@/shared/lib/utils'
import { useEffect, useState } from 'react'

// FolderSelectDrawer 컴포넌트
const FolderSelectDrawer = () => {
  const { selectedFolderId, setSelectedFolderId, setDialogState } = useQuizNoteContext()
  const [isOpen, setIsOpen] = useState(false)

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
    setSelectedFolderId('0')
  }, [])

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="flex size-fit items-center">
          <h2 className="mr-[8px] text-title2">전체 노트</h2>
          <Icon name="chevron-down" className="size-[20px]"></Icon>
        </button>
      </DrawerTrigger>

      <DrawerContent className="rounded-t-[16px]">
        <div className="my-[24px] flex h-[85dvh] flex-col">
          <div className="border-b border-border-divider px-[18px]">
            <div className="flex items-center justify-between">
              <h3 className="text-title3">폴더 선택</h3>
              <DrawerClose asChild>
                <button className="text-text-primary" onClick={() => setIsOpen(false)}>
                  <Icon name="cancel" className="size-[24px]"></Icon>
                </button>
              </DrawerClose>
            </div>
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
                    className={cn(folder.id === selectedFolderId && 'text-text-accent')}
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
  )
}

export default FolderSelectDrawer
