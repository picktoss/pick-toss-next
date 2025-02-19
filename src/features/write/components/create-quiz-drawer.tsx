'use client'

import InviteRewardDrawer from '@/features/payment/components/invite-reward-drawer'
import MoreStarDialog from '@/features/payment/components/more-star-dialog'
// import PaymentPopup from '@/features/payment/screen/payment-popup'
import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/shared/components/ui/drawer'
import { Slider } from '@/shared/components/ui/slider'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { useUserStore } from '@/store/user'
import { useEffect, useState } from 'react'

interface Props {
  handleCreateDocument: (params: { quizType: Quiz.Type; star: number }) => void
  maxQuizCount: number
  disabled: boolean
}

const CreateQuizDrawer = ({ handleCreateDocument, maxQuizCount, disabled }: Props) => {
  const MAXIMUM_QUIZ_COUNT = 40
  const DOCUMENT_MIN_QUIZ_COUNT = maxQuizCount < 5 ? maxQuizCount : 5
  const DOCUMENT_MAX_QUIZ_COUNT = Math.min(maxQuizCount, MAXIMUM_QUIZ_COUNT)
  const DEFAULT_QUIZ_COUNT = DOCUMENT_MAX_QUIZ_COUNT

  const { userInfo: user } = useUserStore()
  const [selectedQuizCount, setSelectedQuizCount] = useState(DEFAULT_QUIZ_COUNT)
  const [selectedQuizType, setSelectedQuizType] = useState<Quiz.Type>('MULTIPLE_CHOICE')

  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isOpenMoreStar, setIsOpenMoreStar] = useState(false)
  // const [isOpenPayment, setIsOpenPayment] = useState(false)

  // TODO: 결제 기능 구현 후 아래 코드 삭제
  const [isOpenInvite, setIsOpenInvite] = useState(false)

  useEffect(() => {
    setSelectedQuizCount(DEFAULT_QUIZ_COUNT)
  }, [DEFAULT_QUIZ_COUNT])

  const handleClickQuizType = (quizType: Quiz.Type) => {
    setSelectedQuizType(quizType)
  }

  const handleClickStart = () => {
    const notEnoughStars = (user?.star ?? 0) < selectedQuizCount

    if (notEnoughStars) {
      setIsOpenMoreStar(true)
      return
    }

    handleCreateDocument({ quizType: selectedQuizType, star: selectedQuizCount })
  }

  return (
    <>
      <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
        <DrawerTrigger asChild disabled={disabled}>
          <Button
            variant={'largeRound'}
            colors={'primary'}
            className="flex-center h-[52px] w-full"
            disabled={disabled}
          >
            퀴즈 만들기
          </Button>
        </DrawerTrigger>

        <DrawerContent
          overlayProps={{ className: 'max-w-mobile mx-auto' }}
          className="mx-auto h-[80vh] max-w-mobile rounded-t-[20px]"
        >
          <div className="mt-[24px] flex h-full flex-col items-center justify-between overflow-y-auto overflow-x-hidden px-[16px]">
            <DrawerTitle className="mb-[38px] w-full font-suit text-title3">
              원하는 유형과 문제 수를 선택해주세요
            </DrawerTitle>

            {/* 문제 유형 선택 */}
            <div className="mb-[28px] flex gap-[8px]">
              <button
                onClick={() => handleClickQuizType('MULTIPLE_CHOICE')}
                className={cn(
                  'flex h-[136px] w-[168px] flex-col justify-end rounded-[16px] border px-[7px] pb-[15px] pt-[20px] focus:border-border-focused focus:bg-background-container-03 focus-visible:outline-none',
                  selectedQuizType === 'MULTIPLE_CHOICE' &&
                    'bg-background-container-03 border-border-focused'
                )}
              >
                <Icon name="multiple-quiz-icon" className="mb-[7.05px] w-[70px]" />
                <Text typography="subtitle2-bold" className="mb-[4px] pl-[9px] text-left">
                  객관식
                </Text>
                <Text typography="text2-medium" className="pl-[9px] text-left text-text-sub">
                  4개 선택지 중 정답 고르기
                </Text>
              </button>

              <button
                onClick={() => handleClickQuizType('MIX_UP')}
                className={cn(
                  'flex h-[136px] w-[168px] flex-col justify-end rounded-[16px] border pb-[15px] pt-[18px] focus:border-border-focused focus:bg-background-container-03 focus-visible:outline-none',
                  selectedQuizType === 'MIX_UP' &&
                    'bg-background-container-03 border-border-focused'
                )}
              >
                <Icon name="o-x-quiz-icon" className="mb-[10px] w-[81px] pl-[14px]" />
                <Text typography="subtitle2-bold" className="mb-[4px] pl-[20px] text-left">
                  O/X
                </Text>
                <Text typography="text2-medium" className="pl-[20px] text-left text-text-sub">
                  참과 거짓 판단하기
                </Text>
              </button>
            </div>

            <div className="flex-center h-fit w-full flex-col border-t pb-[66px] pt-[26px] text-text-sub">
              <Text typography="text1-medium">만들 문제 수</Text>
              <Text typography="title1" className="mb-[28px] mt-[8px] text-text-accent">
                {selectedQuizCount} 문제
              </Text>

              {/* 문제 개수 슬라이더 */}
              <Slider
                min={DOCUMENT_MIN_QUIZ_COUNT}
                max={DOCUMENT_MAX_QUIZ_COUNT}
                step={1}
                defaultValue={[DEFAULT_QUIZ_COUNT]}
                value={[selectedQuizCount]}
                onValueChange={(value) => setSelectedQuizCount(value[0] || DEFAULT_QUIZ_COUNT)}
              />

              <div className="mt-[10px] flex w-full items-center justify-between text-text2-medium text-text-sub">
                <Text>{DOCUMENT_MIN_QUIZ_COUNT} 문제</Text>
                <Text>{DOCUMENT_MAX_QUIZ_COUNT} 문제</Text>
              </div>
            </div>

            <div className="flex-center w-full flex-col pb-[40px] pt-[21px]">
              <Text typography="text2-medium" color="sub">
                현재 나의 별:{' '}
                <Text as={'span'} color="secondary">
                  {user?.star}개
                </Text>
              </Text>

              <Button
                variant={'largeRound'}
                colors={'special'}
                className="mt-[5px] w-full text-button1 text-text-primary-inverse"
                onClick={handleClickStart}
              >
                퀴즈 만들기
                <div className="flex-center size-[fit] rounded-full bg-[#D3DCE4]/[0.2] px-[8px]">
                  <Icon name="star" className="mr-[4px] size-[16px]" />
                  <Text typography="text1-medium">{selectedQuizCount}</Text>
                </div>
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* 이용자에게 별이 부족할 경우 아래 렌더링 */}
      <MoreStarDialog
        isOpen={isOpenMoreStar}
        setIsOpen={setIsOpenMoreStar}
        onClickPayment={() => {
          setIsOpenMoreStar(false)
          setIsOpenDrawer(false)
          // setIsOpenPayment(true)
          setIsOpenInvite(true)
        }}
      />

      {/* {isOpenPayment && (
        // 결제권유 창
        <PaymentPopup isProUser={false} onClose={() => setIsOpenPayment(false)} />
      )} */}

      {/* TODO: 결제 기능 구현 후 아래 코드 삭제 */}
      <InviteRewardDrawer
        triggerComponent={<></>}
        open={isOpenInvite}
        onOpenChange={setIsOpenInvite}
      />
    </>
  )
}

export default CreateQuizDrawer
