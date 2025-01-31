import { DeepRequired } from 'react-hook-form'
import { paths } from './schema'

declare global {
  declare namespace Notification {
    declare namespace Request {}

    declare namespace Response {
      /** GET /api/v2/notifications
       * 모든 알림 가져오기
       */
      type GetAllNotifications = DeepRequired<
        paths['/api/v2/notifications']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >
    }
  }
}
