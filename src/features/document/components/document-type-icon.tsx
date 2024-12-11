import Icon from '@/shared/components/custom/icon'
import { cn } from '@/shared/lib/utils'

interface Props {
  type: Document.ItemInList['documentType']
  containerClassName: HTMLElement['className']
  iconClassName: HTMLElement['className']
}

// DocumentCard 내부에서 사용되는 컴포넌트
const DocumentTypeIcon = ({ type, containerClassName, iconClassName }: Props) => {
  if (type === 'TEXT') {
    return (
      <div
        className={cn(
          'flex-center size-[36px] shrink-0 rounded-full bg-fill-secondary-orange text-text-primary-inverse',
          containerClassName
        )}
      >
        <Icon name="document" className={cn('size-[16px]', iconClassName)} />
      </div>
    )
  }

  if (type === 'FILE') {
    return (
      <div
        className={cn(
          'flex-center size-[36px] shrink-0 rounded-full bg-fill-secondary-blue text-text-primary-inverse',
          containerClassName
        )}
      >
        <Icon name="clip" className={cn('size-[16px]', iconClassName)} />
      </div>
    )
  }

  if (type === 'NOTION') {
    return (
      <div
        className={cn(
          'flex-center size-[36px] shrink-0 rounded-full border border-border-default bg-background-base-01 text-text-primary-inverse',
          containerClassName
        )}
      >
        <Icon name="notion" className={cn('size-[19px]', iconClassName)} />
      </div>
    )
  }

  // default
  return (
    <div
      className={cn(
        'flex-center size-[36px] shrink-0 rounded-full bg-fill-secondary-orange text-text-primary-inverse',
        containerClassName
      )}
    >
      <Icon name="document" className={cn('size-[16px]', iconClassName)} />
    </div>
  )
}

export default DocumentTypeIcon
