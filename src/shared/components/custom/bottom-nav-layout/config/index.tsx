import Icon from '../../custom/icon'

export const navigationItems = [
  {
    href: '/main',
    title: '홈' as const,
    Icon: ({ isActive }: { isActive: boolean }) => {
      return (
        <Icon
          name="picktoss"
          className="size-[24px]"
          fill={isActive ? 'var(--color-orange-500)' : 'var(--color-gray-200)'}
        />
      )
    },
    segments: [['main']],
  },
  {
    href: '/note',
    title: '퀴즈 노트' as const,
    Icon: ({ isActive }: { isActive: boolean }) => {
      return (
        <Icon
          name="quiz-note"
          className="size-[24px]"
          fill={isActive ? 'var(--color-orange-500)' : 'var(--color-gray-200)'}
        />
      )
    },
    segments: [['note']],
  },
  {
    href: '/collections',
    title: '컬렉션' as const,
    Icon: ({ isActive }: { isActive: boolean }) => {
      return (
        <Icon
          name="planet"
          className="size-[24px]"
          fill={isActive ? 'var(--color-orange-500)' : 'var(--color-gray-200)'}
        />
      )
    },
    segments: [['collections']],
  },
  {
    href: '/profile',
    title: '마이' as const,
    Icon: ({ isActive }: { isActive: boolean }) => {
      return (
        <Icon
          name="person"
          className="size-[24px]"
          fill={isActive ? 'var(--color-orange-500)' : 'var(--color-gray-200)'}
        />
      )
    },
    segments: [['profile']],
  },
]
