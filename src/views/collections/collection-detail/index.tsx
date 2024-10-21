'use client'

import CategoryTag from '@/shared/components/category-tag'
import FixedBottom from '@/shared/components/fixed-bottom'
import Icon from '@/shared/components/icon'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'
import QuizCard from './components/quiz-card'

type BaseQuiz = {
  id: string
  question: string
  answer: string
  explanation: string
}

type MultipleChoiceQuiz = BaseQuiz & {
  type: 'multiple'
  options: string[]
}

type OXQuiz = BaseQuiz & {
  type: 'ox'
  answer: 'O' | 'X'
}

export type Quiz = MultipleChoiceQuiz | OXQuiz

const quizzes: Quiz[] = [
  {
    id: '1',
    type: 'multiple',
    question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
    options: [
      '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
      '배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
      '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이',
      '기존의 배양육이 기존방식에서 육류보다 토양이 비축된다',
    ],
    answer: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
    explanation: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
  },
  {
    id: '2',
    type: 'ox',
    question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
    answer: 'O',
    explanation: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
  },
  {
    id: '3',
    type: 'multiple',
    question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
    options: [
      '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
      '배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
      '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이',
      '기존의 배양육이 기존방식에서 육류보다 토양이 비축된다',
    ],
    answer: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
    explanation: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
  },
  {
    id: '4',
    type: 'ox',
    question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
    answer: 'O',
    explanation: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
  },
]

const CollectionDetail = () => {
  const router = useRouter()

  return (
    <div className="flex h-dvh flex-col">
      <header className="sticky top-0 h-[54px] bg-white">
        <div className="flex h-full items-center justify-between px-[16px] text-icon-system">
          <button onClick={() => router.back()}>
            <Icon name="cancel" className="size-[24px]" />
          </button>
          <div className="flex items-center gap-[16px]">
            <Icon name="share" className="size-[24px]" />
            <Icon name="menu-dots" className="size-[24px]" />
          </div>
        </div>
      </header>

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

      <div className="flex-1 overflow-y-auto bg-background-base-02 px-[16px] py-[24px]">
        <div className="flex flex-col gap-[12px]">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>

      <FixedBottom>
        <Button className="w-full">퀴즈 시작하기</Button>
      </FixedBottom>
    </div>
  )
}

export default CollectionDetail
