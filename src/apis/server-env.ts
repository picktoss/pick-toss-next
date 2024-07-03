import { assert } from '@/utils/assert'

export const ServerEnv = {
  apiUrl: () => {
    const devApiUrl = process.env.NEXT_PUBLIC_DEV_API_URL
    const prodApiUrl = process.env.NEXT_PUBLIC_PROD_API_URL

    if (process.env.NODE_ENV === 'development') {
      assert(devApiUrl, 'NEXT_PUBLIC_DEV_API_URL 값이 .env.local에 없습니다.')
      return devApiUrl
    } else if (process.env.NODE_ENV === 'production') {
      assert(prodApiUrl, 'NEXT_PUBLIC_PROD_API_URL 값이 .env.local에 없습니다.')
      return prodApiUrl
    } else {
      throw new Error('NODE_ENV 값이 올바르지 않습니다. development 또는 production이어야 합니다.')
    }
  },
}
