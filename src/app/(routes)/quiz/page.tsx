import { fetchTodayQuizSetId } from '@/requests/quiz'
import { Button } from '@/shared/components/ui/button'
import Link from 'next/link'

const QuizPage = async () => {
  const { quizSetId, type } = await fetchTodayQuizSetId()

  return (
    <Link href={type === 'READY' ? `/quiz/${quizSetId}?quizType=today` : '#'}>
      <Button>오늘의 퀴즈 풀러가기</Button>
    </Link>
  )
}

export default QuizPage
