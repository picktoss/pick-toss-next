'use client'

import { useState } from 'react'
import TitleInput from '../components/title-input'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import dynamic from 'next/dynamic'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { Button } from '@/shared/components/ui/button'
import { useCreateDocument } from '@/requests/document/hooks'
import { MAX_CHARACTERS, MIN_CHARACTERS } from '@/features/document/config'
import { useDirectoryContext } from '@/features/directory/contexts/directory-context'

const Editor = dynamic(() => import('../components/editor'), {
  ssr: false,
})

const WriteDocumentPage = () => {
  const { selectedDirectory } = useDirectoryContext()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const { mutate: createDocumentMutate } = useCreateDocument()

  const handleCreateDocument = () => {
    // TODO: validation
    if (!selectedDirectory) {
      return
    }

    createDocumentMutate({
      directoryId: selectedDirectory.id,
      documentName: title,
      file: content,
      quizType: 'MULTIPLE_CHOICE',
      star: 5,
      documentType: 'TEXT',
    })
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
        <Button
          variant={'largeRound'}
          colors={'primary'}
          className="flex-center h-[52px] w-full"
          onClick={handleCreateDocument}
        >
          퀴즈 만들기
        </Button>
      </FixedBottom>
    </div>
  )
}

export default WriteDocumentPage
