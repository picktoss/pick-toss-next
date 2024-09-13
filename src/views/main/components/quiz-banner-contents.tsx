import { TodayQuizSetType } from '@/actions/fetchers/quiz/get-today-quiz-set-id'
import icons from '@/constants/icons'
import { CategoryProtector } from '@/shared/components/category-protector'
import { CreateDocumentProtector } from '@/shared/components/create-document-protector'
import { SwitchCase } from '@/shared/components/react/switch-case'
import { Button } from '@/shared/components/ui/button'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import { getCurrentDate } from '@/shared/utils/date'
import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// QuizBanner 내부에서 사용되는 컴포넌트들
interface Props {
  bannerTop: {
    type: TodayQuizSetType | 'CREATING'
    session: Session | null
    resultScore: number | null
  }
  bannerBottom: {
    type: TodayQuizSetType | 'CREATING'
    quizSetId: string | null
    remainingTime: {
      hours: number
      minutes: number
    }
  }
}

// BannerTopContent 컴포넌트
export const BannerTopContent = ({ type, session, resultScore }: Props['bannerTop']) => {
  return (
    <>
      <div className="z-10 text-h4-bold text-gray-09 lg:text-h2-bold">
        <SwitchCase
          value={type}
          caseBy={{
            READY: (
              <>
                <div className="lg:hidden">
                  {session?.user.dto.name}님을 위한 <br />
                  퀴즈가 준비되었어요
                </div>
                <div className="hidden lg:block">
                  {getCurrentDate({ month: true, day: true })} 오늘의 퀴즈
                </div>
              </>
            ),
            NOT_READY: <div>아직 만들어진 퀴즈가 없어요</div>,
            DONE: <div>오늘의 퀴즈 완료!</div>,
            CREATING: <div>현재 퀴즈를 만들고 있어요</div>,
          }}
        />
      </div>
      <div className="z-10 text-gray-08">
        <SwitchCase
          value={type}
          caseBy={{
            READY: (
              <>
                <div className="text-body2-medium lg:hidden">
                  {getCurrentDate({ month: true, day: true, dayOfWeek: true })}
                </div>
                <div className="hidden text-body1-medium lg:block">
                  {session?.user.dto.name}님을 위해 AI가 선별한 오늘의 퀴즈를 풀어보세요
                </div>
              </>
            ),
            NOT_READY: (
              <div className="text-nowrap text-small1-regular lg:text-body1-medium">
                현재 노트 양이 충분하지 않거나, <br className="lg:hidden" />
                AI pick이 적용된 노트가 없는 상태입니다
              </div>
            ),
            DONE: (
              <div className="text-body2-medium lg:text-body1-medium">
                나의 점수: {resultScore || 0}점
              </div>
            ),
            CREATING: (
              <div className="text-body2-medium lg:text-body1-medium">
                AI <i>p</i>ick이 진행된 문서로부터 <br className="lg:hidden" />
                퀴즈를 생성중입니다
              </div>
            ),
          }}
        />
      </div>
    </>
  )
}

// BannerBottomContent 컴포넌트
export const BannerBottomContent = ({ type, quizSetId, remainingTime }: Props['bannerBottom']) => {
  const router = useRouter()
  const { clickedEvent } = useAmplitudeContext()

  return (
    <SwitchCase
      value={type}
      caseBy={{
        READY: (
          <Button
            className="flex w-full gap-[8px] rounded-[32px] lg:w-[240px]"
            onClick={() => {
              clickedEvent({
                buttonType: 'todayQuiz',
                buttonName: 'banner_start_today_quiz_button',
              })
              router.push(`/quiz?quizSetId=${quizSetId}`)
            }}
          >
            <div>오늘의 퀴즈 시작하기</div>
            <Image src={icons.arrowRight} width={20.25} height={13.5} alt="" />
          </Button>
        ),
        NOT_READY: (
          <div className="absolute bottom-[16px] flex w-full flex-col gap-[24px] lg:flex-row lg:gap-[21px]">
            <CreateDocumentProtector
              skeleton={
                <Button className="flex w-[calc(100%-40px)] gap-[8px] rounded-[32px] lg:relative lg:bottom-0 lg:w-[240px]">
                  <div>노트 추가하러 가기</div>
                  <Image src={icons.arrowRight} width={20.25} height={13.5} alt="" />
                </Button>
              }
            >
              <CategoryProtector>
                <Button
                  className="flex w-[calc(100%-40px)] gap-[8px] rounded-[32px] lg:relative lg:bottom-0 lg:w-[240px]"
                  onClick={() => {
                    clickedEvent({
                      buttonType: 'addNote',
                      buttonName: 'banner_add_document_button',
                    })
                    router.push('/create')
                  }}
                >
                  <div>노트 추가하러 가기</div>
                  <Image src={icons.arrowRight} width={20.25} height={13.5} alt="" />
                </Button>
              </CategoryProtector>
            </CreateDocumentProtector>
            <div className="flex items-center justify-center gap-[8px] text-small1-regular lg:text-text-medium">
              <p className="text-gray-07">퀴즈가 어떤지 궁금하다면?</p>
              <Link
                href="/quiz/practice"
                className="border-b border-blue-06 pb-[2px] text-blue-06"
                onClick={() =>
                  clickedEvent({
                    buttonType: 'quizPractice',
                    buttonName: 'banner_start_example_quiz_button',
                  })
                }
              >
                연습 문제 풀어보기
              </Link>
            </div>
          </div>
        ),
        DONE: (
          <Button className="z-10 flex w-full cursor-default gap-[8px] rounded-[32px] bg-blue-03 text-blue-06 hover:bg-blue-03 lg:w-[240px]">
            <div>
              내일 퀴즈까지 {remainingTime.hours.toString().padStart(2, '0')}:
              {remainingTime.minutes.toString().padStart(2, '0')}분 남음
            </div>
          </Button>
        ),
        CREATING: (
          <Button className="z-10 flex w-full cursor-default gap-[8px] rounded-[32px] bg-blue-03 text-blue-06 hover:bg-blue-03 lg:w-[240px]">
            <div>퀴즈 도착 예정</div>
          </Button>
        ),
      }}
    />
  )
}

// BannerImage 컴포넌트
export const BannerImage = ({ type }: { type: TodayQuizSetType | 'CREATING' }) => {
  return (
    <SwitchCase
      value={type}
      caseBy={{
        READY: (
          <Image
            src={icons.quizReady}
            width={148}
            className="absolute right-[10px] lg:right-[16px] lg:top-[19px] lg:w-[230px]"
            alt=""
          />
        ),
        NOT_READY: (
          <Image
            src={icons.quizNotReady}
            width={148}
            className="absolute right-[18px] lg:right-0 lg:mt-[6px] lg:w-[297px]"
            alt=""
          />
        ),
        DONE: (
          <>
            <Image
              src={icons.quizDone}
              width={230}
              className="absolute bottom-0 right-0 lg:hidden"
              alt=""
            />
            <Image
              src={icons.quizDoneDesktop}
              width={430}
              className="absolute bottom-0 right-0 hidden lg:block"
              alt=""
            />
          </>
        ),
        CREATING: (
          <Image
            src={icons.quizCreating}
            width={335}
            className="absolute bottom-[100px] right-[30px] w-[180px] lg:bottom-[39px] lg:right-[40px] lg:w-[335px]"
            alt=""
          />
        ),
      }}
    />
  )
}
