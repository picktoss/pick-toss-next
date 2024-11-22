'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { MAX_CHARACTERS, MIN_CHARACTERS } from '../document/config'
import { useParams } from 'next/navigation'
import { useGetDocumentDetail } from '@/requests/document/hooks'
import Loading from '@/shared/components/custom/loading'
import TitleInput from '../modify/components/title-input'
import VisualEditor from '../modify/components/visual-editor'
import { useEditDocumentContext } from '../modify/context/edit-document-context'

const ModifyDocument = () => {
  const { id } = useParams()
  const { data, isPending } = useGetDocumentDetail(Number(id[0]))
  const { editorMarkdownContent: content } = useEditDocumentContext()

  if (isPending) {
    return <Loading center />
  }

  return (
    <>
      <TitleInput prevTitle={data?.name} />

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
