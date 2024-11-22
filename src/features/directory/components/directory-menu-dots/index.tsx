'use client'

import Icon from '@/shared/components/custom/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import DirectoryDialog from '@/features/quiz/components/directory-dialog'
import SetDirectoryNameDialog from '../set-directory-name-dialog'
import { useDocumentContext } from '../../../document/contexts/document-context'

const DirectoryMenuDots = () => {
  const { setIsSelectMode } = useDocumentContext()

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
          prev={{ name: '전공 공부', emoji: '📊' }}
        />

        {/* 폴더 삭제 */}
        <DirectoryDialog
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
              전공 공부 폴더와 <span className="text-text-wrong">14개의 노트</span>가 <br />
              모두 삭제됩니다.
            </Text>
          }
          onConfirm={() => {}}
          confirmText="삭제하기"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DirectoryMenuDots
