'use client'

import { Button } from '@/shared/components/ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/shared/components/ui/drawer'
import { Slider } from '@/shared/components/ui/slider'
import Text from '@/shared/components/ui/text'
import { useState } from 'react'
import Icon from '@/shared/components/custom/icon'
import { cn } from '@/shared/lib/utils'
import { useReplayDocumentQuiz } from '@/requests/quiz/hooks'
import { useRouter } from 'next/navigation'

interface Props {
  triggerComponent: React.ReactNode
  documentId: number
  documentName: string
  directoryEmoji: string
  savedQuizCount: number
}

// ReplayQuizDrawer 컴포넌트
const ReplayQuizDrawer = ({
  triggerComponent,
  documentId,
  documentName,
  directoryEmoji,
  savedQuizCount,
}: Props) => {
  const router = useRouter()

  const { mutate: replayDocumentQuizMutate } = useReplayDocumentQuiz()

  const [quizType, setQuizType] = useState<Quiz.ReplayType>('RANDOM')
  const [quizCount, setQuizCount] = useState(savedQuizCount)

  const minQuizCount = savedQuizCount > 5 ? 5 : 1

  const handleClickStart = () => {
    // 퀴즈 다시 풀기 세트 생성하는 api 호출해 quiz set id 얻어
    // /quiz/id?quizType=document로 이동
    replayDocumentQuizMutate(
      {
        documentId: documentId,
        requestBody: { quizType, quizCount },
      },
      {
        onSuccess: (data) =>
          router.replace(
            `/quiz/${data.quizSetId}?` +
              'quizSetType=DOCUMENT_QUIZ_SET' +
              '&' +
              `createdAt=${data.createdAt}&documentName=${documentName}&directoryEmoji=${directoryEmoji}` +
              '&' +
              'redirectUrl=' +
              `/document/${documentId}`
          ),
      }
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{triggerComponent}</DrawerTrigger>

      <DrawerContent
        overlayProps={{ className: 'max-w-mobile mx-auto' }}
        className="mx-auto h-fit max-h-[90dvh] max-w-mobile rounded-t-[20px]"
      >
        <div className="my-[24px] flex h-fit flex-col items-center overflow-y-auto overflow-x-hidden px-[16px]">
          <DrawerTitle className="mb-[38px] w-full font-suit text-title3">
            원하는 유형과 문제 수를 선택해주세요
          </DrawerTitle>

          {/* 문제 유형 선택 */}
          {/* TODO: 해당 문서에서 생성된 퀴즈들 중, 특정 유형이 없다면 그 유형은 disabled 처리해야함 */}
          <div className="mb-[28px] flex gap-[8px]">
            <button
              onClick={() => setQuizType('RANDOM')}
              className={cn(
                'flex h-[150px] w-[110px] flex-col justify-end rounded-[16px] border px-[20px] pb-[15px] pt-[20px] focus:border-border-focused focus:bg-background-container-03 focus-visible:outline-none disabled:pointer-events-none disabled:grayscale disabled:bg-background-disabled disabled:text-text-disabled',
                quizType === 'RANDOM' && 'bg-background-container-03 border-border-focused'
              )}
            >
              <Icon name="random-quiz-icon" className="mb-[7.05px] w-[76px]" />
              <Text typography="subtitle2-bold" className="mb-[4px]">
                랜덤
              </Text>
              <Text typography="text2-medium" className="flex text-start text-text-sub">
                모든 유형 <br /> 랜덤으로 섞기
              </Text>
            </button>

            <button
              onClick={() => setQuizType('MULTIPLE_CHOICE')}
              className={cn(
                'flex h-[150px] w-[110px] flex-col justify-end rounded-[16px] border px-[7px] pb-[15px] pt-[20px] focus:border-border-focused focus:bg-background-container-03 focus-visible:outline-none disabled:grayscale disabled:bg-background-disabled disabled:text-text-disabled',
                quizType === 'MULTIPLE_CHOICE' && 'bg-background-container-03 border-border-focused'
              )}
            >
              <Icon name="multiple-quiz-icon" className="mb-[7.05px] w-[70px]" />
              <Text typography="subtitle2-bold" className="mb-[4px] pl-[9px]">
                객관식
              </Text>
              <Text typography="text2-medium" className="flex pl-[9px] text-start text-text-sub">
                4개 선택지 중 <br /> 정답 고르기
              </Text>
            </button>

            <button
              onClick={() => setQuizType('MIX_UP')}
              className={cn(
                'flex h-[150px] w-[110px] flex-col justify-end rounded-[16px] border pb-[15px] pt-[18px] focus:border-border-focused focus:bg-background-container-03 focus-visible:outline-none disabled:grayscale disabled:bg-background-disabled disabled:text-text-disabled',
                quizType === 'MIX_UP' && 'bg-background-container-03 border-border-focused'
              )}
            >
              <Icon name="o-x-quiz-icon" className="mb-[10px] w-[81px] pl-[14px]" />
              <Text typography="subtitle2-bold" className="mb-[4px] pl-[20px]">
                O/X
              </Text>
              <Text typography="text2-medium" className="flex pl-[20px] text-start text-text-sub">
                참과 거짓 <br /> 판단하기
              </Text>
            </button>
          </div>

          <div className="flex-center h-fit w-full flex-col border-t pb-[66px] pt-[26px] text-text-sub">
            <Text typography="text1-medium">다시 풀 문제 수</Text>
            <Text typography="title1" className="mb-[28px] mt-[8px] text-text-accent">
              {quizCount} 문제
            </Text>

            {/* 문제 개수 슬라이더 */}
            <Slider
              min={minQuizCount}
              max={savedQuizCount} // 저장된 문제 수
              step={1}
              defaultValue={[savedQuizCount]} // 저장된 문제 수
              onValueChange={(value) => setQuizCount(value[0] || 0)}
            />

            <div className="mt-[10px] flex w-full items-center justify-between text-text2-medium text-text-sub">
              <Text>{minQuizCount} 문제</Text>
              <Text>{savedQuizCount} 문제</Text>
            </div>
          </div>

          <div className="flex-center w-full flex-col pb-[40px] pt-[21px]">
            <Button
              onClick={() => handleClickStart()}
              variant={'largeRound'}
              colors={'primary'}
              className="mt-[5px] w-[335px] max-w-full text-button1 text-text-primary-inverse"
            >
              퀴즈 시작하기
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default ReplayQuizDrawer
