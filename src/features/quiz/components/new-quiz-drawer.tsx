'use client'

import { Button } from '@/shared/components/ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/shared/components/ui/drawer'
import { Slider } from '@/shared/components/ui/slider'
import Text from '@/shared/components/ui/text'
import { useEffect, useState } from 'react'
import Icon from '@/shared/components/custom/icon'
import { cn } from '@/shared/lib/utils'
import MoreStarDialog from '../../payment/components/more-star-dialog'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { calculateAvailableQuizCount } from '@/features/document/utils'
import { useUserStore } from '@/store/user'
import { useDocumentDetailContext } from '@/features/document/contexts/document-detail-context'
import { createPortal } from 'react-dom'

interface Props {
  triggerComponent: React.ReactNode
  documentId: number
  documentName: string
  directoryEmoji: string
  startAddQuizzes: (quizCount: number, quizType: Quiz.Type) => void
}

// NewQuizDrawer 컴포넌트
const NewQuizDrawer = ({ triggerComponent, documentId, startAddQuizzes }: Props) => {
  const { userInfo: user } = useUserStore()
  const { setIsDrawerOpen } = useDocumentDetailContext()

  const { data } = useQuery(queries.document.item(documentId))
  const contentLength = data?.content.trim().length ?? 1000
  const maxQuizCount = calculateAvailableQuizCount(contentLength)

  const MAXIMUM_QUIZ_COUNT = 40
  const DOCUMENT_MIN_QUIZ_COUNT = maxQuizCount < 5 ? maxQuizCount : 5
  const DOCUMENT_MAX_QUIZ_COUNT = Math.min(maxQuizCount, MAXIMUM_QUIZ_COUNT)
  const DEFAULT_QUIZ_COUNT = DOCUMENT_MAX_QUIZ_COUNT

  const [openDrawer, setOpenDrawer] = useState(false)
  const [quizType, setQuizType] = useState<Quiz.Type>('MULTIPLE_CHOICE')
  const [quizCount, setQuizCount] = useState(DEFAULT_QUIZ_COUNT)
  const [isOpenMoreStar, setIsOpenMoreStar] = useState(false)

  useEffect(() => {
    setIsDrawerOpen(openDrawer)
  }, [setIsDrawerOpen, openDrawer])

  const handleClickQuizType = (quizType: Quiz.Type) => {
    setQuizType(quizType)
  }

  const handleClickStart = (quizCount: number, quizType: Quiz.Type) => {
    const notEnoughStars = (user?.star ?? 0) < quizCount

    if (notEnoughStars) {
      setIsOpenMoreStar(true)
      return
    }

    startAddQuizzes(quizCount, quizType)
  }

  return (
    <>
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer} modal>
        <DrawerTrigger asChild>{triggerComponent}</DrawerTrigger>

        {createPortal(
          <DrawerContent
            overlayProps={{ className: 'max-w-mobile mx-auto' }}
            className="mx-auto h-fit max-h-[90dvh] max-w-mobile rounded-t-[20px]"
          >
            <div className="my-[24px] flex h-fit flex-col items-center overflow-y-auto overflow-x-hidden px-[16px]">
              <DrawerTitle className="mb-[38px] w-full font-suit text-title3">
                원하는 유형과 문제 수를 선택해주세요
              </DrawerTitle>

              {/* 문제 유형 선택 */}
              <div className="mb-[28px] flex gap-[8px]">
                <button
                  onClick={() => handleClickQuizType('MULTIPLE_CHOICE')}
                  className={cn(
                    'flex h-[136px] w-[168px] flex-col justify-end rounded-[16px] border px-[7px] pb-[15px] pt-[20px] focus:border-border-focused focus:bg-background-container-03 focus-visible:outline-none',
                    quizType === 'MULTIPLE_CHOICE' &&
                      'bg-background-container-03 border-border-focused'
                  )}
                >
                  <Icon name="multiple-quiz-icon" className="mb-[7.05px] w-[70px]" />
                  <Text typography="subtitle2-bold" className="mb-[4px] pl-[9px] text-start">
                    객관식
                  </Text>
                  <Text typography="text2-medium" className="pl-[9px] text-start text-text-sub">
                    4개 선택지 중 정답 고르기
                  </Text>
                </button>

                <button
                  onClick={() => handleClickQuizType('MIX_UP')}
                  className={cn(
                    'flex h-[136px] w-[168px] flex-col justify-end rounded-[16px] border pb-[15px] pt-[18px] focus:border-border-focused focus:bg-background-container-03 focus-visible:outline-none',
                    quizType === 'MIX_UP' && 'bg-background-container-03 border-border-focused'
                  )}
                >
                  <Icon name="o-x-quiz-icon" className="mb-[10px] w-[81px] pl-[14px]" />
                  <Text typography="subtitle2-bold" className="mb-[4px] pl-[20px] text-start">
                    O/X
                  </Text>
                  <Text typography="text2-medium" className="pl-[20px] text-start text-text-sub">
                    참과 거짓 판단하기
                  </Text>
                </button>
              </div>

              <div className="flex-center h-fit w-full flex-col border-t pb-[66px] pt-[26px] text-text-sub">
                <Text typography="text1-medium">만들 문제 수</Text>
                <Text typography="title1" className="mb-[28px] mt-[8px] text-text-accent">
                  {quizCount} 문제
                </Text>

                {/* 문제 개수 슬라이더 */}
                <Slider
                  min={DOCUMENT_MIN_QUIZ_COUNT}
                  max={DOCUMENT_MAX_QUIZ_COUNT}
                  step={1}
                  defaultValue={[DEFAULT_QUIZ_COUNT]}
                  onValueChange={(value) => setQuizCount(value[0] || DEFAULT_QUIZ_COUNT)}
                />

                <div className="mt-[10px] flex w-full items-center justify-between text-text2-medium text-text-sub">
                  <Text>{DOCUMENT_MIN_QUIZ_COUNT} 문제</Text>
                  <Text>{DOCUMENT_MAX_QUIZ_COUNT} 문제</Text>
                </div>
              </div>

              <div className="flex-center w-full flex-col pb-[40px] pt-[21px]">
                <Text typography="text2-medium">
                  <span className="text-text-sub">현재 나의 별: </span>
                  <span className="text-text-secondary">{user?.star}개</span>
                </Text>

                <Button
                  variant={'largeRound'}
                  colors={'special'}
                  className="mt-[5px] w-[335px] max-w-full text-button1 text-text-primary-inverse"
                  onClick={() => handleClickStart(quizCount, quizType)} // 임시
                >
                  퀴즈 시작하기
                  <div className="flex-center size-[fit] rounded-full bg-[#D3DCE4]/[0.2] px-[8px]">
                    <Icon name="star" className="mr-[4px] size-[16px]" />
                    <Text typography="text1-medium">{quizCount}</Text>
                  </div>
                </Button>
              </div>
            </div>
          </DrawerContent>,
          document.body
        )}
      </Drawer>

      {/* 이용자에게 별이 부족할 경우 아래 렌더링 */}
      <MoreStarDialog isOpen={isOpenMoreStar} setIsOpen={setIsOpenMoreStar} />
    </>
  )
}

export default NewQuizDrawer
