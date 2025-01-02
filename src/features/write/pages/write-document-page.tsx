'use client'

import { useEffect, useId, useState } from 'react'
import TitleInput from '../components/title-input'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import dynamic from 'next/dynamic'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { useCreateDocument } from '@/requests/document/hooks'
import { CreateDocumentSchema, DOCUMENT_CONSTRAINTS } from '@/features/document/config'
import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import CreateQuizDrawer from '../components/create-quiz-drawer'
import AiCreatingQuiz from '@/features/quiz/screen/ai-creating-quiz'
import { useRouter } from 'next/navigation'
import CreateQuizError from '@/features/quiz/screen/create-quiz-error'
import { calculateAvailableQuizCount } from '@/features/document/utils'
import { useToast } from '@/shared/hooks/use-toast'
import ExitDialog from '@/features/quiz/screen/quiz-view/components/exit-dialog'

const Editor = dynamic(() => import('../components/editor'), {
  ssr: false,
})

const WriteDocumentPage = () => {
  const minContentChar = DOCUMENT_CONSTRAINTS.CONTENT.MIN
  const maxContentChar = DOCUMENT_CONSTRAINTS.CONTENT.MAX

  const router = useRouter()

  const { selectedDirectory, selectDirectoryId, globalDirectoryId } = useDirectoryContext()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [documentId, setDocumentId] = useState<number | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [showCreatePopup, setShowCreatePopup] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const [openExitDialog, setOpenExitDialog] = useState(false)

  const { mutate: createDocumentMutate } = useCreateDocument()

  const toastId = useId()
  const { toast } = useToast()

  if (!selectedDirectory) {
    selectDirectoryId(globalDirectoryId)
  }

  const handleCreateError = (response: string) => {
    setShowCreatePopup(false)
    setCreateError(response)
  }

  const validateCreateDocument = (data: unknown) => {
    const result = CreateDocumentSchema.safeParse(data)
    if (!result.success) {
      setValidationError(result.error.errors[0]?.message ?? 'create validation error')
      return false
    }
    setValidationError(null)
    return true
  }

  const handleCreateDocument = ({ quizType, star }: { quizType: Quiz.Type; star: number }) => {
    if (!selectedDirectory) {
      setValidationError('폴더 선택은 필수입니다')
      return
    }

    const createDocumentData: Document.Request.CreateDocument = {
      directoryId: String(selectedDirectory.id),
      documentName: title || '새로운 노트',
      file: content,
      quizType,
      star: String(star),
      documentType: 'TEXT',
    }

    if (!validateCreateDocument(createDocumentData)) {
      return
    }

    createDocumentMutate(createDocumentData, {
      onSuccess: ({ id }) => {
        setDocumentId(id)
        setShowCreatePopup(true)
      },
    })
  }

  useEffect(() => {
    if (validationError) {
      toast({}).update({
        id: toastId,
        title: validationError,
      })

      setValidationError(null)
    }
  }, [validationError])

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // ai 퀴즈 생성 팝업이 열려 있는 상태에서는 뒤로 가기 이벤트를 확인
      if (showCreatePopup) {
        event.preventDefault()
        window.history.pushState(null, '', window.location.href)

        setOpenExitDialog(true)
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
        <div className="fixed right-1/2 z-50 h-dvh w-dvw max-w-mobile translate-x-1/2 bg-background-base-01">
          <AiCreatingQuiz
            documentId={documentId}
            documentName={title || '새로운 노트'}
            directoryEmoji={selectedDirectory?.emoji ?? '📁'}
            onError={handleCreateError}
          />
        </div>

        <ExitDialog
          open={openExitDialog}
          onOpenChange={setOpenExitDialog}
          index={0}
          isFirst={true}
        />
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
            최소 {minContentChar}자, 최대 {maxContentChar}자 입력 가능
          </Text>
        </div>
        <Text typography="text1-medium" className="text-text-secondary">
          <Text
            as="span"
            color={
              content.length < minContentChar || content.length > maxContentChar
                ? 'critical'
                : 'info'
            }
          >
            {content.length}
          </Text>{' '}
          / {maxContentChar}
        </Text>
      </div>

      <Editor handleContentChange={(value: string) => setContent(value)} />

      <FixedBottom className="px-[20px]">
        <CreateQuizDrawer
          handleCreateDocument={handleCreateDocument}
          maxQuizCount={calculateAvailableQuizCount(content.length)}
          disabled={content.length < minContentChar}
        />
      </FixedBottom>
    </div>
  )
}

export default WriteDocumentPage
