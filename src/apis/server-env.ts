import assert from 'assert'

export const ServerEnv = {
  apiUrl: () => {
    assert(process.env.NEXT_PUBLIC_API_URL, 'NEXT_PUBLIC_API_URL 값이 .env.local에 없습니다.')

    return process.env.NEXT_PUBLIC_API_URL
  },
}
