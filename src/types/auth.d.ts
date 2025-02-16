import { DeepRequired } from 'react-hook-form'
import { paths } from './schema'

declare global {
  declare namespace Auth {
    declare namespace Request {
      /** POST /api/v2/auth/invite-code/verify
       * 초대 코드 인증
       */
      type VerifyInviteCode = DeepRequired<
        paths['/api/v2/auth/invite-code/verify']['post']['requestBody']['content']['application/json;charset=UTF-8']
      >
    }

    declare namespace Response {
      /** GET /api/v2/auth/invite-link
       * 초대 링크 생성
       */
      type GetInviteLink = DeepRequired<
        paths['/api/v2/auth/invite-link']['get']['responses']['201']['content']['application/json;charset=UTF-8']
      >
    }
  }
}
