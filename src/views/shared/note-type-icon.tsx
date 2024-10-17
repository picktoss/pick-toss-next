import Icon from '@/shared/components/icon'
import { cn } from '@/shared/lib/utils'

interface Props {
  type: 'write' | 'file' | 'notion'
  containerClassName: string
  iconClassName: string
}

// NoteCard 내부에서 사용되는 컴포넌트
const NoteTypeIcon = ({ type, containerClassName, iconClassName }: Props) => {
  if (type === 'write') {
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

  if (type === 'file') {
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

  if (type === 'notion') {
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
}

export default NoteTypeIcon
