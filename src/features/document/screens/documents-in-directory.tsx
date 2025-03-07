'use client'

import { cn } from '@/shared/lib/utils'
import DocumentList from '../components/document-list'
import SwipeableDocumentCard from '../components/swipeable-document-card'
import AddDocumentMenu from '../components/add-document-menu'
import Image from 'next/image'
import Text from '@/shared/components/ui/text'
import Loading from '@/shared/components/custom/loading'
import { useDirectoryContext } from '../../directory/contexts/directory-context'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useDocumentContext } from '../contexts/document-context'
import { useEffect } from 'react'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
import { useIsPWA } from '@/shared/hooks/use-pwa'
import WebInstallView from '@/features/view/web-install'

const DocumentsInDirectory = () => {
  const { selectedDirectoryId } = useDirectoryContext()
  const { checkDoc, sortOption } = useDocumentContext()

  const { isMobile } = useScreenSize()
  const isPWA = useIsPWA()

  const params =
    selectedDirectoryId !== null
      ? { directoryId: String(selectedDirectoryId), sortOption }
      : { sortOption }
  const { data, isPending } = useQuery(queries.document.list(params))

  useEffect(() => {
    if (data) {
      const documentCheckList =
        data.documents.map((document) => ({ ...document, id: document.id, checked: false })) ?? []

      checkDoc.set(documentCheckList)
    }
  }, [data])

  if (isMobile && !isPWA) {
    return <WebInstallView />
  }

  if (isPending) {
    return <Loading center />
  }

  return (
    <>
      {/* 노트가 하나도 없을 경우 아래 렌더링 */}
      {data?.documents.length === 0 || !data ? (
        <div className="flex-center grow overflow-y-auto">
          <div className="flex-center relative size-[202px] flex-col">
            <Image
              src={'/images/document.png'}
              alt="노트 작성"
              objectPosition="center"
              width={100}
              height={100}
            />
            <div className="flex-center mx-[12px] grow flex-col">
              <h3 className="mb-[8px] text-title3">노트를 등록해보세요</h3>
              <Text as="p" typography="text1-medium" className="text-center text-text-sub">
                직접 추가하거나 연동한 노트에서 <br /> 퀴즈를 만들 수 있어요
              </Text>
            </div>
          </div>
        </div>
      ) : (
        <DocumentList>
          {data.documents.map((document, idx) => (
            <SwipeableDocumentCard
              key={document.id}
              id={document.id}
              createType={document.documentType}
              title={document.name}
              content={document.previewContent ?? ''}
              quizCount={document.totalQuizCount}
              characterCount={document.characterCount}
              directory={
                document.directory.tag === 'DEFAULT' ? '전체 노트' : document.directory.name
              }
              className={cn(idx === data.documents.length - 1 && 'mb-[30px]')}
              reviewCount={document.reviewNeededQuizCount}
            />
          ))}
        </DocumentList>
      )}

      <AddDocumentMenu />
    </>
  )
}

export default DocumentsInDirectory
