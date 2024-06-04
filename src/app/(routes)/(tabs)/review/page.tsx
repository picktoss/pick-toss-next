import { CommonLayout } from '@/components/common-layout'
import ProTag from '@/components/pro-tag'
import { Button } from '@/components/ui/button'
import icons from '@/constants/icons'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default function Review() {
  return (
    <CommonLayout
      title={{
        label: '복습 체크',
        icon: (
          <Image src={icons.ranking} width={24} height={24} alt="" className="lg:size-[32px]" />
        ),
      }}
      mobileOptions={{
        hasNotifications: true,
      }}
    >
      <main className="mt-[18px] pb-[50px] lg:mt-[24px] lg:px-[20px]">
        <div className="flex flex-col gap-[12px] px-[20px] lg:flex-row lg:px-0">
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
          <ArchiveLink
            redirectUrl="#"
            title="저장한 pick"
            icon={
              <div className="flex size-[56px] items-center justify-center rounded-full bg-orange-01">
                <Image src={icons.savePick} width={31} height={31} alt="" />
              </div>
            }
            count={45}
          />
        </div>

        <div className="mt-[32px] flex flex-col gap-[24px] lg:mt-[16px] lg:gap-[16px]">
          <section className="flex flex-col gap-[24px] rounded-[12px] p-[20px] pb-[22px] lg:bg-white">
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

          <section className="flex flex-col gap-[24px] bg-white p-[20px] pb-[17px]">
            <h2 className="text-h4-bold text-gray-09">내가 자주 틀린 노트 TOP5</h2>
            <ul className="*:border-b *:border-gray-01 *:px-[12px]">
              <FrequentlyWrongNoteItem
                rank={1}
                redirectUrl="#"
                title="중간고사 요점정리"
                categoryName="전공 공부"
                wrongCount={9}
              />
              <FrequentlyWrongNoteItem
                rank={2}
                redirectUrl="#"
                title="파이썬 기초"
                categoryName="코딩 아카데미"
                wrongCount={7}
              />
              <FrequentlyWrongNoteItem
                rank={3}
                redirectUrl="#"
                title="대충 엄청 긴 이름의 문서 엄청 긴 이름의 문서 엄청 긴 이름의 문서 엄청 긴 이름의 문서"
                categoryName="엄청 긴 이름의 카테고리 엄청 긴 이름의 카테고리 엄청 긴 이름의 카테고리 엄청 긴 이름의 카테고리"
                wrongCount={5}
              />
              <FrequentlyWrongNoteItem
                rank={4}
                redirectUrl="#"
                title="4/3 노트필기"
                categoryName="컴활 필기 준비"
                wrongCount={3}
              />
              <FrequentlyWrongNoteItem
                rank={5}
                redirectUrl="#"
                title="철학자별 특징과 차이"
                categoryName="철학입문"
                wrongCount={9}
              />
            </ul>
          </section>

          {/** TODO: 퀴즈 분석 */}
          {/* <section className="flex flex-col bg-white p-[20px]">
            <h2 className="text-h4-bold text-gray-09">퀴즈 분석</h2>
          </section> */}
        </div>
      </main>
    </CommonLayout>
  )
}

function ArchiveLink({
  redirectUrl,
  title,
  icon,
  count,
  isPro,
}: {
  redirectUrl: string
  title: string
  icon: React.ReactNode
  count: number
  isPro?: boolean
}) {
  return (
    <Link
      href={redirectUrl}
      className="flex justify-between rounded-[12px] bg-white p-[20px] lg:w-full"
    >
      <div className="flex items-center gap-[16px] lg:gap-[10px]">
        {icon}
        <div className="flex flex-col gap-[4px]">
          <div className="flex items-center gap-[8px]">
            <div className="text-h4-bold text-gray-09">{title}</div>
            {isPro && <ProTag />}
          </div>
          <div className="text-body1-medium text-gray-06">{count}개</div>
        </div>
      </div>
      <Image src={icons.chevronRight} width={6} height={10} alt="" className="lg:hidden" />
    </Link>
  )
}

function FrequentlyWrongNoteItem({
  rank,
  redirectUrl,
  title,
  categoryName,
  wrongCount,
}: {
  rank: number
  redirectUrl: string
  title: string
  categoryName: string
  wrongCount: number
}) {
  return (
    <Link
      href={redirectUrl}
      className="flex h-[62px] items-center justify-between last:border-none"
    >
      <div className="flex items-center gap-[16px]">
        <span className="text-body2-bold text-orange-06">{rank}</span>
        <div className="flex flex-col gap-[4px]">
          <div className="line-clamp-1 text-body1-medium text-gray-08">{title}</div>
          <div className="line-clamp-1 text-small1-regular text-gray-06">{categoryName}</div>
        </div>
      </div>
      <div className="flex shrink-0 gap-[40px] pl-[12px]">
        <div className="text-body2-medium text-orange-05">오답 {wrongCount}회</div>
        <Image src={icons.chevronRight} width={6} height={10} alt="" />
      </div>
    </Link>
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
        isDone ? 'bg-white lg:border lg:border-gray-02' : 'bg-orange-01'
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
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
