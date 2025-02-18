import Icon from '@/shared/components/custom/icon'
import { SwitchCase } from '@/shared/components/custom/react/switch-case'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { getRelativeTime } from '@/shared/utils/date'

interface Props {
  type: Notification.Response.GetAllNotifications['notifications'][0]['notificationType']
  title: string
  content: string
  date: string
  isFirst: boolean
  isLast: boolean
}

const NotificationItem = ({ type, title, content, date, isFirst, isLast }: Props) => {
  return (
    <>
      <div
        className={cn(
          'flex h-fit w-full items-center justify-between py-[20px] border-t border-border-divider',
          isFirst && 'border-none'
        )}
      >
        <div className="flex items-center gap-[16px]">
          <SwitchCase
            value={type}
            caseBy={{
              GENERAL: <Icon name="noti-general" className="size-[32px]" />,
              UPDATE_NEWS: <Icon name="noti-update-news" className="size-[32px]" />,
              TODAY_QUIZ: <Icon name="noti-today-quiz" className="size-[32px]" />,
              COLLECTION: <Icon name="noti-collection" className="size-[32px]" />,
              STAR_REWARD: <Icon name="noti-reward" className="size-[32px]" />,
            }}
            defaultComponent={<Icon name="noti-general" className="size-[32px]" />}
          />

          <div className="flex flex-col">
            <Text typography="subtitle2-bold">{title}</Text>
            <Text typography="text1-medium" color="sub">
              {content}
            </Text>
          </div>
        </div>

        <Text typography="text2-medium" color="caption" className="self-start">
          {getRelativeTime(date)}
        </Text>
      </div>

      {isLast && (
        <Text typography="text2-medium" color="caption" className="mt-[36px] self-center">
          최근 14일 동안 받은 알림을 모두 확인했어요
        </Text>
      )}
    </>
  )
}

export default NotificationItem
