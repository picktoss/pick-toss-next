import Icon from '@/shared/components/custom/icon'
import { SwitchCase } from '@/shared/components/custom/react/switch-case'
import { cn } from '@/shared/lib/utils'

interface Props {
  type: Quiz.Set.Type
  className?: HTMLElement['className']
}

const RecordQuizTypeIcon = ({ type, className }: Props) => {
  return (
    <SwitchCase
      value={type}
      caseBy={{
        DOCUMENT_QUIZ_SET: (
          <Icon name="document-type-round-icon" className={cn('size-[40px]', className)} />
        ),

        TODAY_QUIZ_SET: (
          <Icon name="today-quiz-type-round-icon" className={cn('size-[40px]', className)} />
        ),

        COLLECTION_QUIZ_SET: (
          <Icon name="collection-type-round-icon" className={cn('size-[40px]', className)} />
        ),
      }}
      defaultComponent={
        <Icon name="document-type-round-icon" className={cn('size-[40px]', className)} />
      }
    />
  )
}

export default RecordQuizTypeIcon
