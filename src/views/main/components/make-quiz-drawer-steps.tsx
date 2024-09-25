import { FakeSelectTrigger } from '@/shared/components/fake-select-trigger'
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer'
import SelectDrawerContent from './select-drawer-content'
import SelectCheckItems from './select-check-items'
import { ReturnUseCheckList, SelectCategoryItem, SelectDocumentItem } from '@/types/quiz'
import { CategoryDTO } from '@/actions/types/dto/category.dto'
import { useState } from 'react'

// MakeQuizDrawer 내부에서 사용되는 컴포넌트들
interface Props {
  categories: CategoryDTO[]
  step: 'folder' | 'document'
  setStep: (step: 'folder' | 'document') => void
  folder: ReturnUseCheckList<SelectCategoryItem>
  doc: ReturnUseCheckList<SelectDocumentItem>
}

// FolderDrawer 컴포넌트
export const FolderDrawer = ({ categories, step, setStep, folder, doc }: Props) => {
  const [openFolderDrawer, setOpenFolderDrawer] = useState(false)

  const curCategory = categories[0]

  return (
    <Drawer open={openFolderDrawer} onOpenChange={setOpenFolderDrawer}>
      <DrawerTrigger
        className="cursor-pointer"
        onClick={() => {
          setStep('folder')
          doc.unCheckAllWithoutIgnored()
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
              items={step === 'folder' ? folder.list : doc.list}
              isAllChecked={
                step === 'folder' ? folder.isAllChecked() : doc.isAllCheckedWithoutIgnored()
              }
              unCheckAll={step === 'folder' ? folder.unCheckAll : doc.unCheckAllWithoutIgnored}
              checkAll={step === 'folder' ? folder.checkAll : doc.checkAllWithoutIgnored}
              toggle={step === 'folder' ? folder.toggle : doc.toggle}
              selectType={step === 'folder' ? 'category' : 'document'}
            />
          }
          init={() => {
            folder.unCheckAll()
            doc.unCheckAllWithoutIgnored()
            setStep('folder')
          }}
          next={() => {
            if (step === 'folder') {
              const checkedCategoryIds = folder.getCheckedIds()
              doc.set(
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
export const DocumentDrawer = ({ categories, step, setStep, folder, doc }: Props) => {
  const [openDocumentDrawer, setOpenDocumentDrawer] = useState(false)

  return (
    <Drawer open={openDocumentDrawer} onOpenChange={setOpenDocumentDrawer}>
      <DrawerTrigger className="cursor-pointer">
        <FakeSelectTrigger className="w-[74px]" value={`${doc.getCheckedIds().length}개`} />
      </DrawerTrigger>
      <DrawerContent className="h-[510px]">
        <SelectDrawerContent
          step={step}
          selectCheckItems={
            <SelectCheckItems
              items={step === 'folder' ? folder.list : doc.list}
              isAllChecked={
                step === 'folder' ? folder.isAllChecked() : doc.isAllCheckedWithoutIgnored()
              }
              unCheckAll={step === 'folder' ? folder.unCheckAll : doc.unCheckAllWithoutIgnored}
              checkAll={step === 'folder' ? folder.checkAll : doc.checkAllWithoutIgnored}
              toggle={step === 'folder' ? folder.toggle : doc.toggle}
              selectType={step === 'folder' ? 'category' : 'document'}
            />
          }
          init={() => {
            folder.unCheckAll()
            doc.unCheckAllWithoutIgnored()
            setStep('folder')
          }}
          next={() => {
            if (step === 'folder') {
              const checkedCategoryIds = folder.getCheckedIds()
              doc.set(
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
