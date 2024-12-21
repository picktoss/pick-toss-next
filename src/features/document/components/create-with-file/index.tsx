'use client'

import CreateQuizDrawer from '@/features/write/components/create-quiz-drawer'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useEffect, useMemo, useState } from 'react'
import {
  calculateAvailableQuizCount,
  formatFileSize,
  generateMarkdownFromFile,
  isValidFileType,
} from '../../utils'
import { extractPlainText } from '@/features/search/utils'
import Editor from '@/features/write/components/editor'
import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import { useCreateDocument } from '@/requests/document/hooks'
import TitleInput from '@/features/write/components/title-input'
import { useRouter } from 'next/navigation'
import AiCreatingQuiz from '@/features/quiz/screen/ai-creating-quiz'
import CreateQuizError from '@/features/quiz/screen/create-quiz-error'

const CreateWithFile = () => {
  const router = useRouter()
  const { selectedDirectory, selectDirectoryId, globalDirectoryId } = useDirectoryContext()
  const [documentId, setDocumentId] = useState<number | null>(null)
  const [showCreatePopup, setShowCreatePopup] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  const { mutate: createDocumentMutate } = useCreateDocument()
  const [fileInfo, setFileInfo] = useState<{
    name: string
    size: number
    charCount: number
    content: string
  } | null>(null)

  const availableQuizCount = useMemo(
    () => calculateAvailableQuizCount(fileInfo?.charCount ?? 1000),
    [fileInfo?.charCount]
  )

  if (!selectedDirectory) {
    selectDirectoryId(globalDirectoryId)
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fileInfo) {
      setFileInfo(null)
    }

    const file = e.target.files?.[0]

    if (!file || !isValidFileType(file)) {
      alert('PDF, DOCX, TXT 파일만 업로드할 수 있습니다.')
      if (e.target) {
        e.target.value = ''
      }
      return
    }

    // 파일 이름과 크기 가져오기
    const { name, size } = file

    try {
      const markdownString = await generateMarkdownFromFile(file)
      const markdownText = extractPlainText(markdownString)

      if (markdownText.length < 1000 || markdownText.length > 50000) {
        alert('최소 1,000자 이상, 최대 50,000자 이내의 텍스트를 포함한 파일을 첨부해주세요')
        if (e.target) {
          e.target.value = ''
        }
        return
      }

      // 상태 업데이트
      setFileInfo({
        name,
        size,
        charCount: markdownText.length,
        content: markdownString,
      })
    } catch (err) {
      console.error('파일 처리 중 오류 발생:', err)
      alert('파일 처리 중 문제가 발생했습니다.')
    }
  }

  const handleCreateDocument = ({ quizType, star }: { quizType: Quiz.Type; star: number }) => {
    // TODO: validation
    if (!selectedDirectory || !fileInfo || fileInfo.charCount < 1000) {
      return
    }

    createDocumentMutate(
      {
        directoryId: String(selectedDirectory.id),
        documentName: fileInfo.name || 'file생성노트',
        file: fileInfo.content,
        quizType,
        star: String(star),
        documentType: 'FILE',
      },
      {
        onSuccess: ({ id }) => {
          setDocumentId(id)
          setShowCreatePopup(true)
        },
      }
    )
  }

  const handleCreateError = (response: string) => {
    setShowCreatePopup(false)
    setCreateError(response)
  }

  if (fileInfo && documentId !== null && showCreatePopup) {
    return (
      <div className="h-dvh w-full max-w-mobile">
        <div className="fixed right-1/2 z-[9999] h-dvh w-dvw max-w-mobile translate-x-1/2 bg-background-base-01">
          <AiCreatingQuiz
            documentId={documentId}
            documentName={fileInfo.name}
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
            txt, docx 포맷, 3MB 이상 12MB 미만 파일 업로드
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
                {fileInfo?.name}
              </Text>
              <Text as="span" typography="text2-medium" className="text-text-caption">
                {`(${formatFileSize(fileInfo?.size ?? 0)}, ${fileInfo?.charCount}자)`}
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
        {/* TODO: file로 문서 생성하는 로직 필요 */}
        <CreateQuizDrawer
          handleCreateDocument={handleCreateDocument}
          maxQuizCount={availableQuizCount}
        />
      </FixedBottom>
    </div>
  )
}

export default CreateWithFile
