'use client'

import Icon from '@/shared/components/custom/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import SetDirectoryNameDialog from '../set-directory-name-dialog'
import { useDocumentContext } from '../../../document/contexts/document-context'
import ConfirmDialogWidget from '@/widget/confirm-dialog'
import { useDirectoryContext } from '../../contexts/directory-context'
import { useDeleteDirectory } from '@/requests/directory/hooks'

const DirectoryMenuDots = () => {
  const { selectedDirectory, selectedDirectoryId } = useDirectoryContext()
  const { setIsSelectMode } = useDocumentContext()
  const { mutate: deleteDirectoryMutation } = useDeleteDirectory()

  const handleClickDelete = () => {
    if (!selectedDirectoryId) return

    deleteDirectoryMutation(selectedDirectoryId, { onSuccess: () => window.location.reload() })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icon name="menu-dots" className="size-[24px]" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-background-base-01 p-0">
        {/* 노트 선택 */}
        <DropdownMenuItem
          className="w-[240px] cursor-pointer border-t border-border-divider px-[20px] py-[16px]"
          onClick={() => setIsSelectMode(true)}
        >
          <Text typography="subtitle2-medium" className="flex w-full items-center justify-between">
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
                <SetDirectoryNameDialog
                  triggerComponent={
                    <DropdownMenuItem
                      className="w-[240px] cursor-pointer border-t border-border-divider px-[20px] py-[16px]"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Text
                        typography="subtitle2-medium"
                        className="flex w-full items-center justify-between"
                      >
                        폴더 이름 바꾸기
                        <Icon name="write-line" className="size-[20px]" />
                      </Text>
                    </DropdownMenuItem>
                  }
                  title="폴더 이름 바꾸기"
                  onConfirm={() => {}}
                  confirmText="저장"
                  prev={{ name: selectedDirectory.name, emoji: selectedDirectory.emoji }}
                />

                {/* 폴더 삭제 */}
                <ConfirmDialogWidget
                  triggerComponent={
                    <DropdownMenuItem
                      className="w-[240px] cursor-pointer border-t border-border-divider px-[20px] py-[16px] text-text-critical"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Text
                        typography="subtitle2-medium"
                        className="flex w-full items-center justify-between"
                      >
                        폴더 삭제
                        <Icon name="bin" className="size-[20px]" />
                      </Text>
                    </DropdownMenuItem>
                  }
                  title="폴더를 삭제할까요?"
                  content={
                    <Text typography="text1-medium">
                      {selectedDirectory.name} 폴더와{' '}
                      <span className="text-text-wrong">
                        {selectedDirectory.documentCount}개의 노트
                      </span>
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
            ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DirectoryMenuDots
