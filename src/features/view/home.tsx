'use client'

import { useIsPWA } from '@/shared/hooks/use-pwa'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
import MainTodayQuizArea from '../quiz/components/main-today-quiz-area'
import Link from 'next/link'
import Text from '@/shared/components/ui/text'
import BombQuizLottie from '../quiz/components/bomb-quiz-lottie'
import RandomQuizLottie from '../quiz/components/random-quiz-lottie'
import Icon from '@/shared/components/custom/icon'
import ReviewTop5Container from '../document/components/review-top5-container'
import InterestedCategoryCollections from '../collection/components/interested-category-collections'
import Image from 'next/image'
import { DocumentProvider } from '../document/contexts/document-context'
import AddDocumentMenu from '../document/components/add-document-menu'
import Loading from '@/shared/components/custom/loading'
import { useHomeData } from '@/shared/hooks/use-home-data-fetching'
import WebInstallView from './web-install'
import { useSession } from 'next-auth/react'
import OnBoarding from './on-boarding'
import Cookies from 'js-cookie'

const Home = () => {
  const { data: session } = useSession()
  const {
    todaySolvedQuizCount,
    quizSetId,
    createdAt,
    type,
    documents,
    currentConsecutiveDays,
    loading,
  } = useHomeData()

  const isEmpty = !documents || documents.length === 0
  const todayQuizState = isEmpty ? 'EMPTY' : type === 'READY' ? 'ARRIVED' : 'NOT_ARRIVED'

  const { isMobile } = useScreenSize()
  const isPWA = useIsPWA()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const interestedCategoryCompleted = Cookies.get('interested-category-complete')

  if (isMobile && !isPWA) {
    return <WebInstallView />
  }

  if (session?.user.isNewUser && isPWA && interestedCategoryCompleted !== 'true') {
    return <OnBoarding />
  }

  if (loading) {
    return (
      <main className="h-[calc(100dvh-54px-88px)] w-full bg-background-base-02">
        <Loading center />
      </main>
    )
  }

  return (
    <main className="flex h-[calc(100dvh-54px-88px)] w-full flex-col gap-[64px] overflow-y-auto overflow-x-hidden bg-background-base-02 px-[16px] scrollbar-hide">
      <div className="w-full">
        {/* 오늘의 퀴즈 영역 */}
        <MainTodayQuizArea
          state={todayQuizState}
          quizSetId={quizSetId}
          createdAt={createdAt ?? ''}
          todaySolved={todaySolvedQuizCount}
        />

        {/* 오답 / 랜덤 퀴즈 */}
        <div className="mt-[16px] flex gap-[9px]">
          <Link
            href={'/quiz/bomb'}
            className="flex w-1/2 flex-col rounded-[20px] bg-background-base-01 px-[20px] pb-[7px] pt-[16px]"
          >
            <Text typography="subtitle1-bold" className="mb-[2px]">
              오답 터뜨리기
            </Text>
            <Text typography="text2-medium" color="sub" className="mb-[27px]">
              틀린 문제 정복하기
            </Text>

            <BombQuizLottie className="self-end" />
          </Link>

          <Link
            href={'/quiz/random'}
            className="flex w-1/2 flex-col rounded-[20px] bg-background-base-01 px-[20px] pb-[7px] pt-[16px]"
          >
            <Text typography="subtitle1-bold" className="mb-[2px]">
              랜덤 퀴즈
            </Text>
            <Text typography="text2-medium" color="sub" className="mb-[27px]">
              한 문제씩 빠르게 풀기
            </Text>

            <RandomQuizLottie className="self-end" />
          </Link>
        </div>

        {/* 연속으로 푸는 중 */}
        <Link
          href={'/record'}
          className="mt-[16px] flex h-fit w-full items-center gap-[20px] rounded-[20px] bg-background-base-01 px-[24px] py-[19px]"
        >
          <Icon name="calendar" className="size-[40px] p-[4px]" />
          <div className="flex flex-col items-start gap-[4px]">
            <Text typography="title3">{currentConsecutiveDays}일</Text>
            <Text typography="text2-medium" color="sub">
              연속으로 푸는 중
            </Text>
          </div>
        </Link>
      </div>

      {/* 복습 필수 노트 TOP5 */}
      <ReviewTop5Container />

      <div className="flex flex-col gap-[32px] pb-[95px]">
        {/* 픽토스님의 관심분야 컬렉션 */}
        <InterestedCategoryCollections interestedCategory={'IT/프로그래밍'} />

        {/* 픽토스 이용 가이드 */}
        {/* 추후 외부 노션 페이지로 연결 */}
        <div className="flex h-fit w-full items-center justify-between rounded-[16px] bg-background-base-03 py-[16px] pl-[15px] pr-[17px]">
          <div className="flex items-center gap-[12px]">
            <div className="flex-center size-[32px] rounded-[8px] bg-background-base-01">
              <Image
                src="/images/pencil.png"
                alt=""
                width={22.3}
                height={25.57}
                className="mr-[2px]"
              ></Image>
            </div>
            <Text typography="text1-bold" className="font-suit">
              픽토스 이용 가이드
            </Text>
          </div>

          <Icon name="chevron-right" className="text-icon-tertiary" />
        </div>
      </div>

      <DocumentProvider>
        <AddDocumentMenu />
      </DocumentProvider>
    </main>
  )
}

export default Home
