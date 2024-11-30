'use client'

import { useGetDocumentDetail } from '@/requests/document/hooks'
import { useCreateCheckQuizSet } from '@/requests/quiz/hooks'
import Loading from '@/shared/components/custom/loading'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  documentId: number
  documentName: string
  directoryEmoji: string
}

const AiCreatingQuiz = ({ documentId, documentName, directoryEmoji }: Props) => {
  const router = useRouter()
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [quizIsReady, setQuizIsReady] = useState(false)
  const { mutate: documentDetailMutate } = useGetDocumentDetail()
  const { mutate: createCheckQuizSetMutate } = useCreateCheckQuizSet(documentId)

  const messages = [
    'AI가 노트를 읽고 있어요',
    '퀴즈로 만들 내용을 고르고 있어요',
    '열심히 질문을 만들고 있어요',
  ]

  useEffect(() => {
    if (currentMessageIndex === 0) {
      const timer = setTimeout(() => setCurrentMessageIndex(1), 3000)
      return () => clearTimeout(timer)
    } else if (currentMessageIndex === 1) {
      const timer = setTimeout(() => setCurrentMessageIndex(2), 5000)
      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex])

  // 퀴즈 생성 여부 확인용 api polling
  useEffect(() => {
    let pollingInterval: NodeJS.Timeout

    const startPolling = () => {
      pollingInterval = setInterval(() => {
        documentDetailMutate(documentId, {
          onSuccess: (data) => {
            if (data && data.status === 'PROCESSED') {
              setQuizIsReady(true)
              clearInterval(pollingInterval) // 폴링 중단
            }
          },
        })
      }, 5000) // 5초마다 요청
    }

    startPolling()

    return () => clearInterval(pollingInterval) // 컴포넌트 언마운트 시 폴링 중단
  }, [documentDetailMutate, documentId])

  const handleClickStart = () => {
    createCheckQuizSetMutate(undefined, {
      onSuccess: (data) => {
        router.push(
          '/quiz/' +
            data.quizSetId +
            '?quizType=document' +
            '&' +
            `createdAt=${data.createdAt}` +
            '&' +
            `documentName=${documentName}` +
            '&' +
            `directoryEmoji=${directoryEmoji}`
        )
      },
    })
  }

  return (
    <>
      <div className="fixed top-0 h-dvh w-dvw max-w-mobile bg-black opacity-60"></div>

      {quizIsReady ? (
        <div className="flex-center fixed top-0 z-10 h-dvh w-dvw max-w-mobile flex-col">
          <Image src={'/images/question-quiz-card.png'} alt="" width={87} height={106} />

          <Text typography="title2" color="primary-inverse" className="mt-[31px]">
            퀴즈 준비 완료!
          </Text>

          <Button className="mt-[35px] w-[200px]" onClick={handleClickStart}>
            시작하기
          </Button>
        </div>
      ) : (
        <div className="flex-center fixed top-0 z-10 h-dvh w-dvw max-w-mobile flex-col">
          <Loading />

          <Text typography="subtitle2-medium" color="primary-inverse" className="mt-[21.5px]">
            {messages[currentMessageIndex]}
          </Text>
        </div>
      )}
    </>
  )
}

export default AiCreatingQuiz
