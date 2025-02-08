import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'

type QuizWithoutDocument = Omit<Quiz.Item, 'document' | 'directory'>

interface Props {
  quiz: QuizWithoutDocument
  onDelete: (quizId: Quiz.Item['id']) => void
}

const EditQuizCard = ({ quiz, onDelete }: Props) => {
  return (
    <div
      key={quiz.id}
      className={cn(
        'relative rounded-[16px] border border-border-divider p-[16px] flex items-center justify-between'
      )}
    >
      <div>
        <div className="flex items-start gap-[4px] pr-[27px]">
          <Text as="span" typography="text1-bold" className={'text-text-secondary'}>
            Q.
          </Text>
          <Text as="span" typography="text1-bold">
            {quiz.question}{' '}
            <Text as="span" typography="text2-medium" className="text-text-caption">
              중간고사
            </Text>
          </Text>
        </div>

        <div className="mt-[12px] flex">
          <div className="flex-center flex size-[21px]">
            <div className={'size-[3px] rounded-full bg-text-secondary'} />
          </div>
          <Text typography="text1-medium" className={'text-text-secondary'}>
            {quiz.quizType === 'MIX_UP' && (quiz.answer === 'correct' ? 'O' : 'X')}
            {quiz.quizType === 'MULTIPLE_CHOICE' && quiz.answer}
          </Text>
        </div>
      </div>

      <div className="flex-none">
        <button className="py-3 pl-3" onClick={() => onDelete(quiz.id)}>
          <Text typography="text1-medium" color="wrong">
            제거
          </Text>
        </button>
      </div>
    </div>
  )
}

export default EditQuizCard
