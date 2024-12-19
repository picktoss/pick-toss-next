'use client'

import { useEffect, useState } from 'react'
import TitleInput from '../components/title-input'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import dynamic from 'next/dynamic'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { useCreateDocument } from '@/requests/document/hooks'
import { MAX_CHARACTERS, MIN_CHARACTERS } from '@/features/document/config'
import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import CreateQuizDrawer from '../components/create-quiz-drawer'
import AiCreatingQuiz from '@/features/quiz/screen/ai-creating-quiz'
import { useRouter } from 'next/navigation'
import CreateQuizError from '@/features/quiz/screen/create-quiz-error.tsx'

const Editor = dynamic(() => import('../components/editor'), {
  ssr: false,
})

const WriteDocumentPage = () => {
  const router = useRouter()

  const { selectedDirectory, selectDirectoryId, globalDirectoryId } = useDirectoryContext()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [documentId, setDocumentId] = useState<number | null>(null)
  const [showCreatePopup, setShowCreatePopup] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  const { mutate: createDocumentMutate } = useCreateDocument()

  if (!selectedDirectory) {
    selectDirectoryId(globalDirectoryId)
  }

  const handleCreateError = (response: string) => {
    setShowCreatePopup(false)
    setCreateError(response)
  }

  const handleCreateDocument = ({ quizType, star }: { quizType: Quiz.Type; star: number }) => {
    // TODO: validation
    if (!selectedDirectory) {
      return
    }

    createDocumentMutate(
      {
        directoryId: String(selectedDirectory.id),
        documentName: title,
        file: content,
        quizType,
        star: String(star),
        documentType: 'TEXT',
      },
      {
        onSuccess: ({ id }) => {
          setDocumentId(id)
          setShowCreatePopup(true)
        },
      }
    )
  }

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // ai 퀴즈 생성 팝업이 열려 있는 상태에서는 뒤로 가기 이벤트를 확인
      if (showCreatePopup) {
        event.preventDefault()
        window.history.pushState(null, '', window.location.href)
        const userConfirm = window.confirm(
          '현재 화면에서 나가시겠습니까? 지금 나가더라도 AI 퀴즈 생성이 중단되지는 않습니다.'
        )
        if (userConfirm && documentId) {
          router.push(`/document/${documentId}`)
        }
      }
    }

    if (showCreatePopup) {
      window.history.pushState(null, '', window.location.href)
      window.addEventListener('popstate', handlePopState)
    }

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [showCreatePopup, router, documentId])

  if (documentId !== null && showCreatePopup) {
    return (
      <div className="h-dvh w-full max-w-mobile">
        <div className="fixed right-1/2 z-[9999] h-dvh w-dvw max-w-mobile translate-x-1/2 bg-background-base-01">
          <AiCreatingQuiz
            documentId={documentId}
            documentName={title}
            directoryEmoji={selectedDirectory?.emoji ?? ''}
            onError={handleCreateError}
          />
        </div>
      </div>
    )
  }

  if (createError !== null) {
    return <CreateQuizError setCreateError={setCreateError} />
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
