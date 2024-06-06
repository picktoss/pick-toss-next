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
      <main className="mt-[18px] flex w-full flex-col gap-[24px] lg:mt-[24px] lg:flex-row lg:gap-[22px] lg:px-[20px] lg:pb-[50px]">
        <div className="flex flex-col gap-[24px] lg:max-w-[490px] lg:gap-[16px]">
          <section className="mt-[8px] flex flex-col gap-[12px] px-[20px] lg:mt-0 lg:flex-row lg:px-0">
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
              redirectUrl="/review/picks"
              title="저장한 pick"
              icon={
                <div className="flex size-[56px] items-center justify-center rounded-full bg-orange-01">
                  <Image src={icons.savePick} width={31} height={31} alt="" />
                </div>
              }
              count={45}
            />
          </section>

          <section className="flex flex-col gap-[24px] rounded-none p-[20px] pb-[22px] lg:rounded-[12px] lg:bg-white">
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

          <section className="flex flex-col gap-[24px] rounded-none bg-white p-[20px] pb-[17px] lg:rounded-[12px]">
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
        </div>

        {/** TODO: 퀴즈 분석 */}
        <section className="flex flex-1 flex-col rounded-none bg-white p-[20px] pb-[70px] lg:max-w-[520px] lg:rounded-[12px] lg:pb-[20px]">
          <h2 className="text-h4-bold text-gray-09">퀴즈 분석</h2>
          <div className="mt-[27px]">
            <div className="mb-[24px] text-center text-h4-bold text-gray-08">5월1일~8일</div>

            <div className="flex flex-col gap-[12px]">
              <div className="text-body1-bold text-gray-08">📚 전공 공부</div>

              <div className="flex flex-col gap-[16px]">
                <div className="flex rounded-[12px] border py-[19px]">
                  <div className="flex flex-1 flex-col items-center gap-[4px] border-r border-gray-02 last:border-none">
                    <QuizIcon />
                    <div className="text-small1-regular text-gray-06">퀴즈 수</div>
                    <div className="text-body1-bold text-gray-08">100개</div>
                  </div>
                  <div className="flex flex-1 flex-col items-center gap-[4px] border-r border-gray-02 last:border-none">
                    <TimerIcon />
                    <div className="text-small1-regular text-gray-06">소요시간</div>
                    <div className="text-body1-bold text-gray-08">234분</div>
                  </div>
                  <div className="flex flex-1 flex-col items-center gap-[4px] border-r border-gray-02 last:border-none">
                    <CorrectIcon />
                    <div className="text-small1-regular text-gray-06">정답률</div>
                    <div className="text-body1-bold text-gray-08">87%</div>
                  </div>
                </div>

                <div className="flex flex-col gap-[26px] rounded-[12px] border p-[16px]">
                  <div className="text-body2-bold text-gray-07">퀴즈 유형</div>

                  <div className="flex h-[28px] gap-[2.2px] overflow-hidden rounded-[12px]">
                    <div className="w-[35%] bg-orange-05" />
                    <div className="w-[65%] bg-blue-05" />
                  </div>

                  <div className="flex justify-center gap-[24px] pb-[32px]">
                    <div className="flex items-center gap-[8px]">
                      <div className="size-[16px] rounded-[4px] bg-orange-05" />
                      <div className="text-small1-bold text-gray-08">객관식</div>
                      <div className="text-small1-bold text-gray-06">35%</div>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <div className="size-[16px] rounded-[4px] bg-blue-05" />
                      <div className="text-small1-bold text-gray-08">O/X</div>
                      <div className="text-small1-bold text-gray-06">65%</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[16px] rounded-[12px] border p-[16px] pb-[11px]">
                  <div className="flex justify-between">
                    <div className="text-body2-bold text-gray-07">정답률 추이</div>

                    <div className="flex gap-[14px]">
                      <div className="flex items-center gap-[8px]">
                        <div className="size-[16px] rounded-[4px] bg-blue-02" />
                        <div className="text-small1-bold text-gray-07">퀴즈 수</div>
                      </div>
                      <div className="flex items-center gap-[8px]">
                        <div className="size-[9px] rounded-full bg-orange-02 ring ring-orange-05" />
                        <div className="text-small1-bold text-gray-07">정답 수</div>
                      </div>
                    </div>
                  </div>

                  <div className="h-[260px] bg-blue-01"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
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

function QuizIcon() {
  return (
    <svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.437 12.3408C31.6091 12.3408 34.9914 15.723 34.9914 19.8952V24.7421C34.9914 28.9143 31.6091 32.2965 27.437 32.2965H15.5196L10.0277 37.3307C9.42204 37.8859 8.44533 37.4563 8.44532 36.6346L8.44532 32.1496C4.9867 31.4578 2.38086 28.4043 2.38086 24.7421V19.8952C2.38086 15.723 5.76308 12.3408 9.93526 12.3408H27.437Z"
        fill="#95B0F8"
      />
      <circle cx="11.5844" cy="22.2582" r="1.41645" fill="#F5F7F9" />
      <circle cx="19.1391" cy="22.2582" r="1.41645" fill="#F5F7F9" />
      <circle cx="26.6928" cy="22.2582" r="1.41645" fill="#F5F7F9" />
      <path
        d="M38.4783 13.1215C38.6953 12.7381 39.1894 12.7381 39.4064 13.1215L40.2459 14.6048C40.2812 14.6672 40.326 14.7219 40.3782 14.7665L41.6661 15.8665C41.9589 16.1167 41.9589 16.6153 41.6661 16.8655L40.3782 17.9655C40.326 18.0101 40.2812 18.0648 40.2459 18.1272L39.4064 19.6105C39.1894 19.9939 38.6953 19.9939 38.4783 19.6105L37.6389 18.1272C37.6036 18.0648 37.5588 18.0101 37.5066 17.9655L36.2187 16.8655C35.9258 16.6153 35.9258 16.1167 36.2187 15.8665L37.5066 14.7665C37.5588 14.7219 37.6036 14.6672 37.6389 14.6048L38.4783 13.1215Z"
        fill="#FFAB40"
      />
      <path
        d="M33.5814 3.79943C33.8851 3.28821 34.5769 3.28821 34.8807 3.79943L36.0559 5.77708C36.1054 5.86025 36.1681 5.93327 36.2412 5.99272L38.0442 7.45942C38.4542 7.79296 38.4542 8.45779 38.0442 8.79133L36.2412 10.258C36.1681 10.3175 36.1054 10.3905 36.0559 10.4737L34.8807 12.4513C34.5769 12.9625 33.8851 12.9625 33.5814 12.4513L32.4061 10.4737C32.3567 10.3905 32.294 10.3175 32.2209 10.258L30.4179 8.79133C30.0078 8.45779 30.0078 7.79296 30.4179 7.45942L32.2209 5.99272C32.294 5.93327 32.3567 5.86025 32.4061 5.77708L33.5814 3.79943Z"
        fill="#FFAB40"
      />
    </svg>
  )
}

function TimerIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="5.00195" width="4" height="4" rx="0.833333" fill="#FFAB40" />
      <circle cx="20" cy="22.916" r="15" fill="#FFECD0" />
      <circle cx="20" cy="22.916" r="13.9583" stroke="#FF9100" strokeWidth="2.08333" />
      <path
        d="M32.4123 9.11441C31.6312 8.33336 30.3649 8.33336 29.5838 9.11441L27.7071 10.9911L31.3153 14.5993L33.192 12.7226C33.973 11.9415 33.973 10.6752 33.192 9.89414L32.4123 9.11441Z"
        fill="#FF9100"
      />
      <g filter="url(#filter0_f_2837_5401)">
        <path
          d="M20 12.916C18.3555 12.916 16.7364 13.3216 15.286 14.0968C13.8357 14.872 12.5989 15.993 11.6853 17.3603C10.7717 18.7277 10.2093 20.2993 10.0482 21.9358C9.88696 23.5724 10.1319 25.2235 10.7612 26.7428C11.3905 28.2622 12.3848 29.6029 13.6561 30.6461C14.9273 31.6894 16.4362 32.403 18.0491 32.7239C19.662 33.0447 21.3291 32.9628 22.9028 32.4854C24.4765 32.008 25.9082 31.1499 27.0711 29.9871L20 22.916V12.916Z"
          fill="#FFD180"
        />
      </g>
      <rect x="15.832" y="2.08398" width="8.33333" height="4.16667" rx="0.833333" fill="#FF9100" />
      <defs>
        <filter
          id="filter0_f_2837_5401"
          x="8"
          y="10.916"
          width="21.0713"
          height="24"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_2837_5401" />
        </filter>
      </defs>
    </svg>
  )
}

function CorrectIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20.625" r="16.875" fill="#63CF75" />
      <path
        d="M13.7305 19.8887L18.8669 25.3134L26.8569 16.875"
        stroke="#F5F7F9"
        strokeWidth="2.81244"
        strokeLinecap="round"
      />
    </svg>
  )
}
