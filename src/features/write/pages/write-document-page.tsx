'use client'

import { useState } from 'react'
import TitleInput from '../components/title-input'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import dynamic from 'next/dynamic'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { useCreateDocument } from '@/requests/document/hooks'
import { MAX_CHARACTERS, MIN_CHARACTERS } from '@/features/document/config'
import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import CreateQuizDrawer from '../components/create-quiz-drawer'
import { useRouter } from 'next/navigation'

const Editor = dynamic(() => import('../components/editor'), {
  ssr: false,
})

const WriteDocumentPage = () => {
  const router = useRouter()

  const { selectedDirectory, selectDirectoryId, globalDirectoryId } = useDirectoryContext()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const { mutate: createDocumentMutate } = useCreateDocument()

  if (!selectedDirectory) {
    selectDirectoryId(globalDirectoryId)
  }

  const handleCreateDocument = ({ quizType, star }: { quizType: Quiz.Type; star: number }) => {
    // TODO: validation
    if (!selectedDirectory) {
      return
    }

    createDocumentMutate(
      {
        directoryId: selectedDirectory.id,
        documentName: title,
        file: content,
        quizType,
        star,
        documentType: 'TEXT',
      },
      {
        onSuccess: ({ id }) => {
          router.push('/quiz' + '?documentId=' + id)
        },
      }
    )
  }

  return (
    <div className="w-full max-w-mobile">
      <TitleInput value={title} handleChange={(value: string) => setTitle(value)} />

      <div className="sticky top-[54px] z-10 flex w-full items-center justify-between bg-background-base-02 px-[16px] py-[11px]">
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

      <Editor handleContentChange={(value: string) => setContent(value)} />

      <FixedBottom className="px-[20px]">
        <CreateQuizDrawer handleCreateDocument={handleCreateDocument} />
      </FixedBottom>
    </div>
  )
}

export default WriteDocumentPage
