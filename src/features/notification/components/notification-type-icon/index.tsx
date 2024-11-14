import Icon from '@/shared/components/custom/icon'
import { SwitchCase } from '@/shared/components/custom/react/switch-case'
import { NotificationType } from '../notification-item'

const NotificationTypeIcon = ({ type }: { type: NotificationType }) => {
  return (
    <SwitchCase
      value={type}
      caseBy={{
        TODAY_QUIZ: <Icon name="noti-today-quiz" className="size-[32px]" />,
        ANALYSIS: <Icon name="noti-analysis" className="size-[32px]" />,
        SYSTEM: <Icon name="noti-system" className="size-[32px]" />,
        REWARD: <Icon name="noti-reward" className="size-[32px]" />,
      }}
    />
  )
}

export default NotificationTypeIcon
