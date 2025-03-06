'use client'

import CreateQuizDrawer from '@/features/write/components/create-quiz-drawer'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useEffect, useId, useMemo, useState } from 'react'
import {
  calculateAvailableQuizCount,
  extractPlainText,
  formatFileSize,
  generateMarkdownFromFile,
  isValidFileType,
} from '../utils'
import Editor from '@/features/write/components/editor'
import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import { useCreateDocument } from '@/requests/document/hooks'
import TitleInput from '@/features/write/components/title-input'
import { useRouter } from 'next/navigation'
import AiCreatingQuiz from '@/features/quiz/screen/ai-creating-quiz'
import CreateQuizError from '@/features/quiz/screen/create-quiz-error'
import { CreateDocumentSchema, DOCUMENT_CONSTRAINTS, FileInfo, FileInfoSchema } from '../config'
import { useToast } from '@/shared/hooks/use-toast'
import ExitDialog from '@/features/quiz/screen/quiz-view/components/exit-dialog'
import Loading from '@/shared/components/custom/loading'

const CreateWithFile = () => {
  const router = useRouter()

  const { selectedDirectory, selectDirectoryId, globalDirectoryId } = useDirectoryContext()
  const [documentId, setDocumentId] = useState<number | null>(null)
  const [showCreatePopup, setShowCreatePopup] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [openExitDialog, setOpenExitDialog] = useState(false)

  const { mutate: createDocumentMutate } = useCreateDocument()

  const toastId = useId()
  const { toast } = useToast()

  const availableQuizCount = useMemo(
    () => calculateAvailableQuizCount(fileInfo?.charCount ?? DOCUMENT_CONSTRAINTS.CONTENT.MIN),
    [fileInfo]
  )

  useEffect(() => {
    if (!selectedDirectory) {
      selectDirectoryId(globalDirectoryId)
    }
  }, [selectedDirectory, globalDirectoryId])

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

  const validateFileInfo = (info: unknown) => {
    const result = FileInfoSchema.safeParse(info)
    if (!result.success) {
      setValidationError(result.error.errors[0]?.message ?? 'file validation error')
      return false
    }
    setValidationError(null)
    return true
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsProcessing(true)

    if (fileInfo) {
      setFileInfo(null)
      setValidationError(null)
    }

    const file = e.target.files?.[0]

    if (!file || !isValidFileType(file)) {
      setIsProcessing(false)
      setValidationError('PDF, DOCX, TXT 파일만 업로드할 수 있습니다.')
      if (e.target) {
        e.target.value = ''
      }
      return
    }

    try {
      const markdownString = await generateMarkdownFromFile(file)
      const markdownText = extractPlainText(markdownString)

      const newFileInfo = {
        name: file.name || '새로운 노트',
        size: file.size,
        charCount: markdownText.length,
        content: markdownString,
      }

      if (!validateFileInfo(newFileInfo)) {
        if (e.target) {
          e.target.value = ''
        }
        return
      }

      if (newFileInfo.charCount < DOCUMENT_CONSTRAINTS.CONTENT.MIN) {
        setValidationError('1,000자 이상인 파일을 업로드해주세요')
      }

      if (newFileInfo.charCount > DOCUMENT_CONSTRAINTS.CONTENT.MAX) {
        setValidationError('50,000자 이하인 파일을 업로드해주세요')
      }

      setFileInfo(newFileInfo)
    } catch (err) {
      console.error('파일 처리 중 오류 발생:', err)
      setValidationError('파일 처리 중 문제가 발생했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCreateDocument = ({
    quizType,
    star,
    handleSpinner,
  }: {
    quizType: Quiz.Type
    star: number
    handleSpinner?: (value: boolean) => void
  }) => {
    if (!selectedDirectory || !fileInfo) {
      setValidationError('노트를 생성할 문서 파일을 첨부해주세요')
      return
    }

    const createDocumentData: Document.Request.CreateDocument = {
      directoryId: String(selectedDirectory.id),
      documentName: fileInfo.name || '새로운 노트',
      file: fileInfo.content,
      quizType,
      star: String(star),
      documentType: 'FILE',
    }

    if (!validateCreateDocument(createDocumentData)) {
      return
    }

    createDocumentMutate(createDocumentData, {
      onSuccess: ({ id }) => {
        handleSpinner && handleSpinner(false)
        setDocumentId(id)
        setShowCreatePopup(true)
      },
    })
  }

  const handleCreateError = (response: string) => {
    setShowCreatePopup(false)
    setCreateError(response)
  }

  if (fileInfo && documentId !== null && showCreatePopup) {
    return (
      <div className="h-dvh w-full max-w-mobile">
        <div className="fixed right-1/2 z-50 h-dvh w-dvw max-w-mobile translate-x-1/2 bg-background-base-01">
          <AiCreatingQuiz
            documentId={documentId}
            documentName={fileInfo.name || '새로운 노트'}
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

  if (documentId !== null && createError !== null) {
    return <CreateQuizError documentId={documentId} setCreateError={setCreateError} />
  }

  if (isProcessing) {
    return <Loading center />
  }

  return (
    <div className="w-full max-w-mobile">
      <TitleInput
        value={fileInfo?.name ?? ''}
        handleChange={(value) => setFileInfo((prev) => prev && { ...prev, name: value })}
      />

      {/* 파일 첨부 영역 : 첨부된 파일이 없을 때 노출 */}
      {!fileInfo && (
        <div className="flex-center h-[calc(100dvh-131.6px-188px)] flex-col">
          <input
            type="file"
            name="filePdf"
            id="filePdf"
            accept=".pdf, .docx, .txt, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="filePdf"
            className="flex-center mb-[16px] h-[94px] w-[246px] cursor-pointer rounded-[16px] border-2 border-dashed border-border-default"
          >
            <Icon name="plus-circle" className="mr-[12px] size-[24px]" />
            <Text typography="subtitle2-bold" className="text-text-secondary">
              파일 추가하기
            </Text>
          </label>
          <Text typography="text1-medium" className="text-text-sub">
            txt, docx, pdf 포맷, 6KB 이상 12MB 미만 파일 업로드
          </Text>
        </div>
      )}

      {/* 첨부한 파일이 있으면 파일 정보 렌더링 : 파일 이름, 용량, 글자 수*/}
      {fileInfo && (
        <>
          <div className="sticky top-[54px] z-10 flex items-center justify-between bg-background-base-02 px-[16px] py-[11px]">
            <div className="flex items-center">
              <Icon name="info" className="mr-[4px] size-[16px]" />
              <Text as="span" typography="text2-medium" className="mr-[4px] text-text-secondary">
                {fileInfo?.name || '새로운 노트'}
              </Text>
              <Text as="span" typography="text2-medium" color="caption">
                ({formatFileSize(fileInfo?.size ?? 0)},{' '}
                <Text
                  as={'span'}
                  color={
                    fileInfo?.content.length < 1000 || fileInfo?.content.length > 50000
                      ? 'critical'
                      : 'caption'
                  }
                >
                  {fileInfo?.content.length}자
                </Text>
                )
              </Text>
            </div>
            <input
              type="file"
              name="filePdf"
              id="filePdf"
              accept=".pdf, .docx, .txt, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="filePdf"
              className="cursor-pointer text-text1-medium text-button-text-tertiary"
            >
              <Text typography="text1-medium" className="text-text-secondary">
                변경
              </Text>
            </label>
          </div>

          {/* 파일 내용 텍스트 */}
          <Editor
            initialContent={fileInfo.content}
            handleContentChange={(value: string) =>
              setFileInfo((prev) => prev && { ...prev, content: value })
            }
          />
        </>
      )}

      <FixedBottom className="px-[20px]">
        <CreateQuizDrawer
          handleCreateDocument={handleCreateDocument}
          maxQuizCount={availableQuizCount}
          disabled={
            (fileInfo?.content?.length ?? 0) < 1000 || (fileInfo?.content?.length ?? 0) > 50000
          }
        />
      </FixedBottom>
    </div>
  )
}

export default CreateWithFile
