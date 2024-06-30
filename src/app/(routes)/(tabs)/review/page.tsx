import { CommonLayout } from '@/components/common-layout'
import ProTag from '@/components/pro-tag'
import { Button } from '@/components/ui/button'
import icons from '@/constants/icons'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ArchiveLink } from './components/archive-link'
import { SavedPicksLink } from './components/saved-picks-link'
import TopFive from './components/top-five'
import { QuizAnalysis } from './components/quiz-analysis'

export default function Review() {
  return (
    <CommonLayout
      title={
        <div className="flex gap-[8px]">
          <span>복습 체크</span>
          <Image src={icons.ranking} width={24} height={24} alt="" className="xl:size-[32px]" />
        </div>
      }
      mobileOptions={{
        hasNotifications: true,
      }}
    >
      <main className="mt-[18px] flex w-full flex-col gap-[24px] xl:mt-[24px] xl:flex-row xl:gap-[22px] xl:px-[20px] xl:pb-[50px]">
        <div className="flex flex-col gap-[24px] xl:max-w-[490px] xl:gap-[16px]">
          <section className="mt-[8px] flex flex-col gap-[12px] px-[20px] xl:mt-0 xl:flex-row xl:px-0">
            <ArchiveLink
              redirectUrl="#"
              title="퀴즈 기록"
              icon={
                <div className="flex size-[56px] items-center justify-center rounded-full bg-blue-01">
                  <Image src={icons.quizArchive} width={31.7} height={31.7} alt="" />
                </div>
              }
              count={143}
              isPro
            />
            <SavedPicksLink />
          </section>

          <section className="flex flex-col gap-[24px] rounded-none p-[20px] pb-[22px] xl:rounded-[12px] xl:bg-white">
            <div className="flex flex-col gap-[8px]">
              <h2 className="flex items-center gap-[8px] text-h4-bold text-gray-09">
                퀴즈 톺아보기 <ProTag />
              </h2>
              <p className="text-body2-regular text-gray-07">
                틀렸거나 고민했던 퀴즈만 모아 복습 세트를 만들어드려요
              </p>
            </div>

            <div className="flex gap-[8px] overflow-auto scrollbar-hide">
              <QuizReviewSet redirectUrl="#" dateString="5월 1주차" quizCount={21} isDone={false} />
              <QuizReviewSet redirectUrl="#" dateString="4월 4주차" quizCount={24} isDone={true} />
              <QuizReviewSet redirectUrl="#" dateString="4월 3주차" quizCount={14} isDone={true} />
              <QuizReviewSet redirectUrl="#" dateString="4월 2주차" quizCount={22} isDone={true} />
              <QuizReviewSet redirectUrl="#" dateString="4월 1주차" quizCount={31} isDone={true} />
            </div>
          </section>

          <TopFive />
        </div>

        <QuizAnalysis />
      </main>
    </CommonLayout>
  )
}

function QuizReviewSet({
  dateString,
  quizCount,
  isDone,
  redirectUrl,
}: {
  dateString: string
  quizCount: number
  isDone: boolean
  redirectUrl: string
}) {
  return (
    <div
      className={cn(
        'relative flex h-[148px] w-[140px] shrink-0 flex-col justify-between rounded-[12px] pb-[13px] pt-[17px]',
        isDone ? 'bg-white xl:border xl:border-gray-02' : 'bg-orange-01'
      )}
    >
      <div className="flex flex-col gap-[4px] px-[16px]">
        <div className="text-body1-bold text-gray-08">{dateString}</div>
        <div className="text-small1-regular text-gray-06">퀴즈 {quizCount}개</div>

        <div className="absolute right-[17px]">{isDone ? <CheckIcon /> : <StarsIcon />}</div>
      </div>

      <Link href={redirectUrl} className="px-[10px]">
        <Button
          className={cn(
            'h-[33px] w-full rounded-full !text-body2-medium',
            isDone && 'bg-gray-02 text-gray-08 hover:bg-gray-04/60'
          )}
        >
          {isDone ? '다시 풀기' : '시작하기'}
        </Button>
      </Link>
    </div>
  )
}

function StarsIcon() {
  return (
    <svg width="19" height="27" viewBox="0 0 19 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.3348 15.4661C13.6806 14.8551 14.4681 14.8551 14.8139 15.4661L16.1516 17.8298C16.2079 17.9292 16.2793 18.0165 16.3625 18.0875L18.4148 19.8405C18.8816 20.2392 18.8816 21.0338 18.4148 21.4324L16.3625 23.1854C16.2793 23.2565 16.2079 23.3438 16.1516 23.4432L14.8139 25.8069C14.4681 26.4179 13.6806 26.4179 13.3348 25.8069L11.9971 23.4432C11.9408 23.3438 11.8694 23.2565 11.7862 23.1854L9.73384 21.4324C9.2671 21.0338 9.2671 20.2392 9.73384 19.8405L11.7862 18.0875C11.8694 18.0165 11.9408 17.9292 11.9971 17.8298L13.3348 15.4661Z"
        fill="#FFAB40"
      />
      <path
        d="M5.53144 0.611017C6.01556 -0.203673 7.118 -0.203672 7.60212 0.611017L9.47495 3.76262C9.55371 3.89516 9.65366 4.01152 9.77014 4.10627L12.6435 6.44361C13.2969 6.97515 13.2969 8.03462 12.6435 8.56617L9.77014 10.9035C9.65366 10.9983 9.55371 11.1146 9.47495 11.2472L7.60212 14.3988C7.118 15.2135 6.01556 15.2135 5.53144 14.3988L3.65861 11.2472C3.57985 11.1146 3.47989 10.9983 3.36341 10.9035L0.490077 8.56617C-0.163358 8.03463 -0.163359 6.97516 0.490076 6.44361L3.36341 4.10627C3.47989 4.01152 3.57985 3.89516 3.65861 3.76262L5.53144 0.611017Z"
        fill="#FFAB40"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 5.42857L6.2 10L14 2"
        stroke="#63CF75"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
