import { FakeSelectTrigger } from '@/shared/components/fake-select-trigger'
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer'
import SelectDrawerContent from './select-drawer-content'
import SelectCheckItems from './select-check-items'
import { useCheckList } from '@/shared/hooks/use-check-list'
import { CheckItem, SelectDocumentItem } from '@/types/quiz'
import { CategoryDTO } from '@/actions/types/dto/category.dto'
import { useState } from 'react'

// MakeQuizDrawer 내부에서 사용되는 컴포넌트들
interface Props {
  categories: CategoryDTO[]
  step: 'folder' | 'document'
  setStep: (step: 'folder' | 'document') => void
  initialCheckList: CheckItem[]
  filteredIgnoreIds: number[]
}

// FolderDrawer 컴포넌트
export const FolderDrawer = ({
  categories,
  step,
  setStep,
  initialCheckList,
  filteredIgnoreIds,
}: Props) => {
  const [openFolderDrawer, setOpenFolderDrawer] = useState(false)

  const {
    list: categoryList,
    isAllChecked: isCategoryAllChecked,
    checkAll: checkCategoryAll,
    unCheckAll: unCheckCategoryAll,
    getCheckedIds: getCategoryCheckedIds,
    toggle: toggleCategoryChecked,
  } = useCheckList(initialCheckList)

  const {
    list: documentList,
    set: setDocumentList,
    toggle: toggleDocumentChecked,
    isAllCheckedWithoutIgnored: isDocumentAllCheckedWithoutIgnored,
    checkAllWithoutIgnored: checkDocumentAllWithoutIgnored,
    unCheckAllWithoutIgnored: unCheckDocumentAllWithoutIgnored,
  } = useCheckList([] as SelectDocumentItem[], {
    ignoreIds: filteredIgnoreIds,
  })

  const curCategory = categories[0]

  return (
    <Drawer open={openFolderDrawer} onOpenChange={setOpenFolderDrawer}>
      <DrawerTrigger
        className="cursor-pointer"
        onClick={() => {
          setStep('folder')
          unCheckDocumentAllWithoutIgnored()
        }}
      >
        <FakeSelectTrigger
          emoji={curCategory.emoji}
          value={curCategory.name}
          className="w-[186px]"
        />
      </DrawerTrigger>
      <DrawerContent className="h-[510px]">
        <SelectDrawerContent
          step={step}
          selectCheckItems={
            <SelectCheckItems
              items={step === 'folder' ? categoryList : documentList}
              isAllChecked={
                step === 'folder' ? isCategoryAllChecked() : isDocumentAllCheckedWithoutIgnored()
              }
              unCheckAll={step === 'folder' ? unCheckCategoryAll : unCheckDocumentAllWithoutIgnored}
              checkAll={step === 'folder' ? checkCategoryAll : checkDocumentAllWithoutIgnored}
              toggle={step === 'folder' ? toggleCategoryChecked : toggleDocumentChecked}
              selectType={step === 'folder' ? 'category' : 'document'}
            />
          }
          init={() => {
            unCheckCategoryAll()
            unCheckDocumentAllWithoutIgnored()
            setStep('folder')
          }}
          next={() => {
            if (step === 'folder') {
              const checkedCategoryIds = getCategoryCheckedIds()
              setDocumentList(
                categories
                  .filter((category) => checkedCategoryIds.includes(category.id))
                  .flatMap((category) =>
                    category.documents.map((document) => ({
                      ...document,
                      checked: false,
                    }))
                  )
              )
              setStep('document')
            } else if (step === 'document') {
              setOpenFolderDrawer(false)
            }
          }}
        />
      </DrawerContent>
    </Drawer>
  )
}

// DocumentDrawer 컴포넌트
export const DocumentDrawer = ({
  categories,
  step,
  setStep,
  initialCheckList,
  filteredIgnoreIds,
}: Props) => {
  const [openDocumentDrawer, setOpenDocumentDrawer] = useState(false)

  const {
    list: categoryList,
    isAllChecked: isCategoryAllChecked,
    checkAll: checkCategoryAll,
    unCheckAll: unCheckCategoryAll,
    getCheckedIds: getCategoryCheckedIds,
    toggle: toggleCategoryChecked,
  } = useCheckList(initialCheckList)

  const {
    list: documentList,
    set: setDocumentList,
    getCheckedIds: getDocumentCheckedIds,
    toggle: toggleDocumentChecked,
    isAllCheckedWithoutIgnored: isDocumentAllCheckedWithoutIgnored,
    checkAllWithoutIgnored: checkDocumentAllWithoutIgnored,
    unCheckAllWithoutIgnored: unCheckDocumentAllWithoutIgnored,
  } = useCheckList([] as SelectDocumentItem[], {
    ignoreIds: filteredIgnoreIds,
  })

  return (
    <Drawer open={openDocumentDrawer} onOpenChange={setOpenDocumentDrawer}>
      <DrawerTrigger className="cursor-pointer">
        <FakeSelectTrigger className="w-[74px]" value={`${getDocumentCheckedIds().length}개`} />
      </DrawerTrigger>
      <DrawerContent className="h-[510px]">
        <SelectDrawerContent
          step={step}
          selectCheckItems={
            <SelectCheckItems
              items={step === 'folder' ? categoryList : documentList}
              isAllChecked={
                step === 'folder' ? isCategoryAllChecked() : isDocumentAllCheckedWithoutIgnored()
              }
              unCheckAll={step === 'folder' ? unCheckCategoryAll : unCheckDocumentAllWithoutIgnored}
              checkAll={step === 'folder' ? checkCategoryAll : checkDocumentAllWithoutIgnored}
              toggle={step === 'folder' ? toggleCategoryChecked : toggleDocumentChecked}
              selectType={step === 'folder' ? 'category' : 'document'}
            />
          }
          init={() => {
            unCheckCategoryAll()
            unCheckDocumentAllWithoutIgnored()
            setStep('folder')
          }}
          next={() => {
            if (step === 'folder') {
              const checkedCategoryIds = getCategoryCheckedIds()
              setDocumentList(
                categories
                  .filter((category) => checkedCategoryIds.includes(category.id))
                  .flatMap((category) =>
                    category.documents.map((document) => ({
                      ...document,
                      checked: false,
                    }))
                  )
              )
              setStep('document')
            } else if (step === 'document') {
              setOpenDocumentDrawer(false)
            }
          }}
        />
      </DrawerContent>
    </Drawer>
  )
}
