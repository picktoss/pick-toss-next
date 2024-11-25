'use client'

import { PropsWithChildren, useEffect } from 'react'
import Icon from '@/shared/components/custom/icon'
import { useDocumentContext } from '../contexts/document-context'
import { useSearchParams } from 'next/navigation'
import MoveDocumentDrawer from './move-document-drawer'

const DocumentList = ({ children }: PropsWithChildren) => {
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')
  const { isSelectMode, setIsExpandedBtns } = useDocumentContext()

  // 메인 페이지에서 '첫 노트 추가하기' 클릭 시 활성화된 상태로 노출
  useEffect(() => {
    ref === 'add-first-document' && setIsExpandedBtns(true)
  }, [ref, setIsExpandedBtns])

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
            <button
              className="flex-center text-text-critical"
              onClick={() => alert('clicked delete')}
            >
              <Icon name="bin" className="mr-[8px]" />
              노트 삭제
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default DocumentList
