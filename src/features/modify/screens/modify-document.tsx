'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useParams } from 'next/navigation'
import Loading from '@/shared/components/custom/loading'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import TitleInput from '@/features/modify/components/title-input'
import VisualEditor from '@/features/modify/components/visual-editor'
import { useEditDocumentContext } from '@/features/modify/context/edit-document-context'
import { MAX_CHARACTERS, MIN_CHARACTERS } from '@/features/document/config'

const ModifyDocument = () => {
  const { id } = useParams()
  const { data, isPending } = useQuery(queries.document.item(Number(id)))
  const { editorMarkdownContent: content } = useEditDocumentContext()

  if (isPending) {
    return <Loading center />
  }

  return (
    <>
      <TitleInput prevTitle={data?.documentName} />

      <div className="sticky top-[54px] z-10 flex items-center justify-between bg-background-base-02 px-[16px] py-[11px]">
        <div className="flex items-center">
          <Icon name="info" className="mr-[4px] size-[16px]" />
          <Text as="span" typography="text2-medium" className="text-text-caption">
            최소 {MIN_CHARACTERS}자, 최대 {MAX_CHARACTERS}자 입력 가능
          </Text>
        </div>
        <Text typography="text1-medium" className="text-text-secondary">
          <Text
            as="span"
            color={
              content.length < MIN_CHARACTERS || content.length > MAX_CHARACTERS
                ? 'critical'
                : 'info'
            }
          >
            {content.length}
          </Text>{' '}
          / {MAX_CHARACTERS}
        </Text>
      </div>

      <VisualEditor prevContent={data?.content} />
    </>
  )
}

export default ModifyDocument
