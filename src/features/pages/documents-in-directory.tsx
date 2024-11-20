'use client'

import { cn } from '@/shared/lib/utils'
import DocumentList from '../document/components/document-list'
import SwipeableDocumentCard from '../document/components/swipeable-document-card'
import AddDocumentMenu from '../document/components/add-document-menu'
import Image from 'next/image'
import Text from '@/shared/components/ui/text'
import note_img from '@/../../public/assets/note.png'
import { useGetDocuments } from '@/requests/document/hooks'

const DocumentsInDirectory = () => {
  const { data } = useGetDocuments(null, 'CREATED_AT')

  // useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   console.log(data)
  // }, [data])

  return (
    <>
      {/* 노트가 하나도 없을 경우 아래 렌더링 */}
      {data?.documents.length === 0 || !data ? (
        <div className="flex-center grow overflow-y-scroll">
          <div className="flex-center relative size-[202px] flex-col">
            <Image src={note_img} alt="노트 작성" objectPosition="center" width={100} />
            <div className="flex-center mx-[12px] grow flex-col">
              <h3 className="mb-[8px] text-title3">노트를 등록해보세요</h3>
              <Text as="p" typography="text1-medium" className="text-center text-text-sub">
                직접 추가하거나 연동한 노트에서 <br /> 퀴즈를 만들 수 있어요
              </Text>
            </div>
          </div>
        </div>
      ) : (
        // 노트 리스트 렌더링
        // todo: useCheckList 훅 이용해 체크 구현
        <DocumentList>
          {data.documents.map((document, idx) => (
            <SwipeableDocumentCard
              key={document.id}
              id={document.id}
              createType={document.documentType}
              title={document.name}
              content={document.content.slice(0, 40)}
              quizCount={document.totalQuizCount}
              characterCount={document.characterCount}
              directory={document.directory.name}
              className={cn(idx === 9 && 'mb-[30px]')}
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
