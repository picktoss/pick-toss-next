// export { apiClient } from './api-client'

import { AxiosRequestConfig } from 'axios'
import { Endpoint } from '../endpoints/types'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { unstable_cache } from 'next/cache'
import { http } from '@/shared/lib/axios/http'

export const apiClient = async <T>({
  endpoint,
  headers,
  data,
  params,
  cache,
}: {
  endpoint: Endpoint
  headers?: Record<string, string>
  data?: object
  params?: object
  cache?: NextFetchRequestConfig
}) => {
  const config = {
    url: endpoint.url,
    method: endpoint.method,
    headers: headers ? headers : ({} as Record<string, string>),
    data,
    params,
  } satisfies AxiosRequestConfig

  if (endpoint.auth) {
    const session = await auth()
    if (!session) {
      throw new Error('Unauthorized')
    }
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`
    }
  }

  if (cache) {
    const cacheKey = `${config.url}:${config.method}:${JSON.stringify(
      config.params
    )}:${JSON.stringify(config.data)}`

    return unstable_cache(async () => await http<T>(config), [cacheKey], cache)()
  }
  return await http<T>(config)
}
