import QuizCard from '@/features/quiz/components/quiz-card'
import { quizzes } from '@/features/quiz/config'
import CategoryTag from '@/shared/components/custom/category-tag'
import Text from '@/shared/components/ui/text'

const DetailInfoWithQuizzes = () => {
  return (
    <>
      <div>
        <div className="flex flex-col items-center pb-[27px] pt-[16px]">
          <div className="flex-center size-[64px] rounded-full bg-background-base-02 text-hero">
            🌼
          </div>
          <Text as="h1" typography="title2" className="mt-[16px]">
            파이썬기본문법과응용
          </Text>
          <CategoryTag title="IT·프로그래밍" className="mt-[10px]" />
        </div>
        <div className="h-px w-full bg-border-divider" />
        <div className="p-[24px_16px_64px_16px]">
          <div>
            <Text typography="subtitle1-bold" className="text-text-primary">
              35 문제
            </Text>
            <div className="mt-[8px] flex items-center gap-[8px]">
              <Text typography="text1-medium" className="text-text-sub">
                객관식 30
              </Text>
              <div className="size-[3px] rounded-full bg-background-container-01" />
              <Text typography="text1-medium" className="text-text-sub">
                O/X
              </Text>
            </div>
          </div>
          <Text as="p" typography="text1-medium" className="mt-[24px] text-text-secondary">
            이 퀴즈는 제가 파이썬을 공부하며 생성한 퀴즈 중 자주 틀린 퀴즈만 모은 컬렉션입니다
            공부에 도움이 되시길 바라며...
          </Text>
        </div>
      </div>

      <div className="flex-1 bg-background-base-02 px-[16px] py-[24px]">
        <div className="flex flex-col gap-[12px]">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </>
  )
}

export default DetailInfoWithQuizzes
