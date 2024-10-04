import Text from '@/shared/components/text'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer'
import Icon from '@/shared/components/v3/icon'
import { useQuizNoteContext } from '../context/quiz-note-context'

const FolderSelectDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useQuizNoteContext()

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
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
                <button className="text-text-primary" onClick={() => setIsDrawerOpen(false)}>
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
              <button className="flex items-center justify-between py-[10px]">
                <Text as="span" typography="subtitle2-medium">
                  📊 전공 공부
                </Text>
                <Text as="span" typography="text1-medium" className="text-text-caption">
                  노트 3개
                </Text>
              </button>
              <button className="flex items-center justify-between py-[10px]">
                <Text as="span" typography="subtitle2-medium">
                  📊 전공 공부
                </Text>
                <Text as="span" typography="text1-medium" className="text-text-caption">
                  노트 12개
                </Text>
              </button>
            </div>
          </div>
          <button className="my-[7px] flex items-center px-[20px] py-[10px]">
            <Icon name="plus-circle" className="mr-[16px]" />
            폴더 추가
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default FolderSelectDrawer
