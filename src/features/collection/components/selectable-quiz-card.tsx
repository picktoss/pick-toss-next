import Text from '@/shared/components/ui/text'

interface Props {
  quiz: Quiz.Item
  onSelect: (quizId: Quiz.Item['id']) => void
  selected: boolean
  order?: number
}

const SelectableQuizCard = ({ quiz, onSelect, selected }: Props) => {
  return (
    <div
      key={quiz.id}
      className="relative cursor-pointer rounded-[16px] border border-border-divider p-[16px]"
    >
      <div className="flex items-start gap-[4px] pr-[27px]">
        <Text as="span" typography="text1-bold" className="text-text-secondary">
          Q.
        </Text>
        <Text as="span" typography="text1-bold">
          {quiz.question}{' '}
          <Text as="span" typography="text2-medium" className="text-text-caption">
            중간고사
          </Text>
        </Text>
      </div>

      <div className="absolute right-[16px] top-[16px] size-[24px] rounded-full border border-border-divider"></div>

      <div className="mt-[12px] flex">
        <div className="flex-center flex size-[21px]">
          <div className="size-[3px] rounded-full bg-text-secondary" />
        </div>
        <Text typography="text1-medium" className="text-text-secondary">
          {quiz.answer}
        </Text>
      </div>
    </div>
  )
}

export default SelectableQuizCard
