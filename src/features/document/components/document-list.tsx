'use client'

import { PropsWithChildren, useEffect } from 'react'
import Icon from '@/shared/components/custom/icon'
import { useDocumentContext } from '../contexts/document-context'
import { useSearchParams } from 'next/navigation'
import MoveDocumentDrawer from './move-document-drawer'
import ConfirmDialogWidget from '@/widget/confirm-dialog'
import Text from '@/shared/components/ui/text'
import { useDeleteDocument } from '@/requests/document/hooks'
import { useDirectoryContext } from '@/features/directory/contexts/directory-context'

const DocumentList = ({ children }: PropsWithChildren) => {
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')
  const { selectedDirectoryId } = useDirectoryContext()
  const {
    isSelectMode,
    setIsSelectMode,
    setIsExpandedBtns,
    checkDoc,
    checkedDocsQuizCount,
    sortOption,
  } = useDocumentContext()
  const { mutate: deleteDocumentMutation } = useDeleteDocument({
    directoryId: String(selectedDirectoryId),
    sortOption,
  })

  // 메인 페이지에서 '첫 노트 추가하기' 클릭 시 활성화된 상태로 노출
  useEffect(() => {
    ref === 'add-first-document' && setIsExpandedBtns(true)
  }, [ref, setIsExpandedBtns])

  const handleClickDelete = () => {
    if (checkDoc.getCheckedIds().length === 0) return

    const documentIds = checkDoc.getCheckedIds().map((id) => Number(id))
    deleteDocumentMutation(documentIds)

    setIsSelectMode(false)
  }

  return (
    <>
      <div className="mt-[54px] flex h-[calc(100dvh-88px-54px)] w-full flex-col gap-[8px] overflow-y-auto overflow-x-hidden px-[14px]">
        {children}
      </div>

      {isSelectMode && (
        <div className="fixed bottom-0 left-1/2 z-30 flex h-[86px] w-full max-w-mobile -translate-x-1/2 flex-col bg-background-base-01">
          <div className="flex h-1/2 w-full items-center justify-between pl-[42px] pr-[64px] pt-[18px] text-text1-medium">
            <MoveDocumentDrawer
              triggerComponent={
                <button className="flex-center text-text-secondary">
                  <Icon name="move" className="mr-[8px]" />
                  다른 폴더로 이동
                </button>
              }
            />
            <ConfirmDialogWidget
              triggerComponent={
                <button className="flex-center text-text-critical">
                  <Icon name="bin" className="mr-[8px]" />
                  노트 삭제
                </button>
              }
              title="노트를 삭제할까요?"
              content={
                <Text typography="text1-medium">
                  선택한 노트와{' '}
                  <span className="text-text-wrong">{checkedDocsQuizCount}개의 문제</span>가 <br />
                  모두 삭제됩니다.
                </Text>
              }
              confirmButton={
                <button onClick={handleClickDelete} className="ml-[21px] p-[4px]">
                  <Text color="critical">삭제하기</Text>
                </button>
              }
            />
          </div>
        </div>
      )}
    </>
  )
}

export default DocumentList
