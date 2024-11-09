import QuizSolvedToday from '@/features/quiz/components/quiz-solved-today'
import CountdownToMidnight from '@/features/quiz/components/countdown-to-midnight'
import Text from '@/shared/components/ui/text'
import BOMB from '@/../../public/images/bomb.png'
import RANDOM_QUIZ from '@/../../public/images/random-quiz.png'
import Image from 'next/image'
import { DirectoryProvider } from '@/features/document/contexts/directory-context'
import AddDocumentMenu from '@/features/document/components/add-document-menu'
import Link from 'next/link'

const Home = () => {
  return (
    <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto bg-background-base-02 px-[16px]">
      {/* 오늘의 퀴즈 영역
        default: 오늘 푼 퀴즈 + 다음 카운트다운
        caseA: 첫 노트 추가하기
        caseB: 오늘의 퀴즈 도착
      */}
      <div className="flex flex-col">
        <QuizSolvedToday quizCount={15} />
        <CountdownToMidnight />
      </div>

      <div className="mt-[16px] flex gap-[9px]">
        <Link
          href={''}
          className="flex w-1/2 flex-col rounded-[20px] bg-background-base-01 px-[20px] pb-[7px] pt-[16px]"
        >
          <Text typography="subtitle1-bold" className="mb-[2px]">
            오답 터뜨리기
          </Text>
          <Text typography="text2-medium" color="sub" className="mb-[27px]">
            틀린 문제 정복하기
          </Text>
          <Image src={BOMB} alt="" className="h-[83px] w-auto self-end" />
        </Link>

        <Link
          href={''}
          className="flex w-1/2 flex-col rounded-[20px] bg-background-base-01 px-[20px] pb-[7px] pt-[16px]"
        >
          <Text typography="subtitle1-bold" className="mb-[2px]">
            랜덤 퀴즈
          </Text>
          <Text typography="text2-medium" color="sub" className="mb-[27px]">
            한 문제씩 빠르게 풀기
          </Text>
          <Image src={RANDOM_QUIZ} alt="" className="h-[83px] w-auto self-end" />
        </Link>
      </div>

      {/* 연속으로 푸는 중 */}

      {/* 복습 필수 노트 TOP5 */}

      {/* 픽토스님의 관심분야 컬렉션 */}

      {/* 픽토스 이용 가이드 */}

      <DirectoryProvider>
        <AddDocumentMenu />
      </DirectoryProvider>
    </main>
  )
}

export default Home
