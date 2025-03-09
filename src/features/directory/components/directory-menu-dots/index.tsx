'use client'

import Icon from '@/shared/components/custom/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import { useDocumentContext } from '../../../document/contexts/document-context'
import ConfirmDialogWidget from '@/widget/confirm-dialog'
import { useDirectoryContext } from '../../contexts/directory-context'
import { useDeleteDirectory } from '@/requests/directory/hooks'
import UpdateDirectoryDialog from '../update-directory-dialog'
import { useState } from 'react'

const DirectoryMenuDots = () => {
  const [openUpdateDirectory, setOpenUpdateDirectory] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openDeleteDirectory, setOpenDeleteDirectory] = useState(false)

  const { selectedDirectory, selectedDirectoryId } = useDirectoryContext()
  const { setIsSelectMode } = useDocumentContext()
  const { mutate: deleteDirectoryMutation } = useDeleteDirectory()

  const handleClickDelete = () => {
    if (!selectedDirectoryId) return

    deleteDirectoryMutation(selectedDirectoryId, { onSuccess: () => window.location.reload() })
  }

  const handleOpenChange = (open: boolean) => {
    setOpenUpdateDirectory(open)
    if (!open) {
      setOpenDropdown(false)
    }
  }

  return (
    <>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger>
          <Icon name="menu-dots" className="size-[24px]" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="bg-background-base-01 p-0">
          {/* 노트 선택 */}
          <DropdownMenuItem
            className="w-[240px] cursor-pointer border-t border-border-divider px-[20px] py-[16px]"
            onClick={() => setIsSelectMode(true)}
          >
            <Text
              typography="subtitle2-medium"
              className="flex w-full items-center justify-between"
            >
              노트 선택
              <Icon name="check" className="size-[20px]" />
            </Text>
          </DropdownMenuItem>

          {
            // 전체 노트 상태일 때는 폴더 이름 변경과 삭제가 불가능하도록 버튼 노출시키지 않음
            !selectedDirectory ||
              (selectedDirectory.tag !== 'DEFAULT' && (
                <>
                  {/* 폴더 이름 바꾸기 */}
                  <DropdownMenuItem
                    onClick={() => {
                      setOpenUpdateDirectory(true)
                      setOpenDropdown(false)
                      setTimeout(() => {
                        const directoryNameInput = document.getElementById(
                          'directoryNameInput'
                        ) as HTMLInputElement | null
                        if (directoryNameInput) {
                          directoryNameInput.focus()
                          directoryNameInput.setSelectionRange(0, directoryNameInput.value.length)
                        }
                      }, 300)
                    }}
                    className="w-[240px] cursor-pointer border-t border-border-divider px-[20px] py-[16px]"
                  >
                    <Text
                      typography="subtitle2-medium"
                      className="flex w-full items-center justify-between"
                    >
                      폴더 이름 바꾸기
                      <Icon name="write-line" className="size-[20px]" />
                    </Text>
                  </DropdownMenuItem>

                  {/* 폴더 삭제 */}
                  <DropdownMenuItem
                    className="w-[240px] cursor-pointer border-t border-border-divider px-[20px] py-[16px] text-text-critical"
                    onClick={() => {
                      setOpenDeleteDirectory(true)
                      setOpenDropdown(false)
                    }}
                  >
                    <Text
                      typography="subtitle2-medium"
                      className="flex w-full items-center justify-between"
                    >
                      폴더 삭제
                      <Icon name="bin" className="size-[20px]" />
                    </Text>
                  </DropdownMenuItem>
                </>
              ))
          }
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 폴더 수정 dialog과 폴더 삭제 dialog */}
      {selectedDirectory !== null && (
        <>
          <UpdateDirectoryDialog
            open={openUpdateDirectory}
            onOpenChange={handleOpenChange}
            directoryId={selectedDirectoryId}
            prevName={selectedDirectory.name}
            prevEmoji={selectedDirectory.emoji}
          />

          <ConfirmDialogWidget
            open={openDeleteDirectory}
            onOpenChange={setOpenDeleteDirectory}
            title="폴더를 삭제할까요?"
            content={
              <Text typography="text1-medium">
                {selectedDirectory.name} 폴더와{' '}
                <span className="text-text-wrong">{selectedDirectory.documentCount}개의 노트</span>
                가 <br />
                모두 삭제됩니다.
              </Text>
            }
            confirmButton={
              <button onClick={handleClickDelete} className="ml-[21px] p-[4px]">
                <Text color="critical">삭제하기</Text>
              </button>
            }
          />
        </>
      )}
    </>
  )
}

export default DirectoryMenuDots
