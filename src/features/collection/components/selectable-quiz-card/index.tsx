import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'

interface Props {
  quiz: Quiz.Item
  onSelect: (quizId: Quiz.Item['id']) => void
  selected: boolean
  order: number
}

const SelectableQuizCard = ({ quiz, onSelect, order, selected }: Props) => {
  return (
    <div
      key={quiz.id}
      className={cn(
        'relative cursor-pointer rounded-[16px] border border-border-divider p-[16px]',
        selected && 'border-border-selected bg-background-container-02'
      )}
      onClick={() => onSelect(quiz.id)}
    >
      <div className="flex items-start gap-[4px] pr-[27px]">
        <Text
          as="span"
          typography="text1-bold"
          className={cn('text-text-secondary', selected && 'text-text-accent')}
        >
          Q.
        </Text>
        <Text as="span" typography="text1-bold" className={cn(selected && 'text-text-accent')}>
          {quiz.question}{' '}
          <Text as="span" typography="text2-medium" className="text-text-caption">
            중간고사
          </Text>
        </Text>
      </div>

      <div
        className={cn(
          'flex-center absolute right-[16px] top-[16px] size-[24px] rounded-full border border-border-divider',
          order > 0 && 'bg-fill-primary-orange border-none'
        )}
      >
        {order > 0 && (
          <Text typography="text2-bold" className="text-text-primary-inverse">
            {order}
          </Text>
        )}
      </div>

      <div className="mt-[12px] flex">
        <div className="flex-center flex size-[21px]">
          <div
            className={cn(
              'size-[3px] rounded-full bg-text-secondary',
              selected && 'bg-text-accent'
            )}
          />
        </div>
        <Text
          typography="text1-medium"
          className={cn('text-text-secondary', selected && 'text-text-accent')}
        >
          {quiz.quizType === 'MIX_UP' && (quiz.answer === 'correct' ? 'O' : 'X')}
          {quiz.quizType === 'MULTIPLE_CHOICE' && quiz.answer}
        </Text>
      </div>
    </div>
  )
}

export default SelectableQuizCard
