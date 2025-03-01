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
      /** POST /api/v2/auth/invite/reward
       * 초대 코드 인증 후 별 지급
       */
      type RewardInviteSignUp = DeepRequired<
        paths['/api/v2/auth/invite/reward']['post']['requestBody']['content']['application/json;charset=UTF-8']
      >
    }

    declare namespace Response {
      /** GET /api/v2/auth/invite
       * 초대 링크 생성
       */
      type GetInviteLink = DeepRequired<
        paths['/api/v2/auth/invite']['get']['responses']['201']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/auth/invite/{invite_code}/creator
       * 초대 링크 생성자 정보 가져오기
       */
      type GetInviteCreator = DeepRequired<
        paths['/api/v2/auth/invite/{invite_code}/creator']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/auth/invite/status
       * 초대 코드로 회원가입했는지 체크
       */
      type GetInviteStatus = DeepRequired<
        paths['/api/v2/auth/invite/status']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >
    }
  }
}
