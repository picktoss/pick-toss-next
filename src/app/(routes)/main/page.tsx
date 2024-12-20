import Text from '@/shared/components/ui/text'
import Image from 'next/image'
import { DocumentProvider } from '@/features/document/contexts/document-context'
import AddDocumentMenu from '@/features/document/components/add-document-menu'
import Link from 'next/link'
import Icon from '@/shared/components/custom/icon'
import MainTodayQuizArea from '@/features/quiz/components/main-today-quiz-area'
import ReviewTop5Container from '@/features/document/components/review-top5-container'
import InterestedCategoryCollections from '@/features/collection/components/interested-category-collections'
import RandomQuizLottie from '@/features/quiz/components/random-quiz-lottie'
import BombQuizLottie from '@/features/quiz/components/bomb-quiz-lottie'
import { getQuizRecordsByDate, getTodayQuizSetId } from '@/requests/quiz/server'
import { getDocuments } from '@/requests/document/server'
import { getFormattedDate } from '@/shared/utils/date'

const Home = async () => {
  const { quizSetId, createdAt, type } = await getTodayQuizSetId()
  const { documents } = await getDocuments()
  const { currentConsecutiveDays } = await getQuizRecordsByDate(getFormattedDate(new Date()))

  const isEmpty = !documents || documents.length === 0
  const todayQuizState = isEmpty ? 'EMPTY' : type === 'READY' ? 'ARRIVED' : 'NOT_ARRIVED'

  return (
    <main className="flex h-[calc(100dvh-54px-88px)] w-full flex-col gap-[64px] overflow-y-auto overflow-x-hidden bg-background-base-02 px-[16px] scrollbar-hide">
      <div className="w-full">
        {/* 오늘의 퀴즈 영역 */}
        <MainTodayQuizArea
          state={todayQuizState}
          quizSetId={quizSetId}
          createdAt={createdAt ?? ''}
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
