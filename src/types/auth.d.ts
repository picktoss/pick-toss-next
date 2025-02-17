import { DeepRequired } from 'react-hook-form'
import { paths } from './schema'

declare global {
  declare namespace Auth {
    declare namespace Request {
      /** POST /api/v2/auth/invite/verify
       * 초대 코드 인증
       */
      type VerifyInviteCode = DeepRequired<
        paths['/api/v2/auth/invite/verify']['post']['requestBody']['content']['application/json;charset=UTF-8']
      >
    }

    declare namespace Response {
      /** GET /api/v2/auth/invite
       * 초대 링크 생성
       */
      type GetInviteLink = DeepRequired<
        paths['/api/v2/auth/invite']['get']['responses']['201']['content']['application/json;charset=UTF-8']
      >
    }
  }
}
