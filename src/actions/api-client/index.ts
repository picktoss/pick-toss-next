/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  data?: any
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

  if (endpoint.auth && !config.headers.Authorization) {
    const session = await auth()
    if (!session) {
      throw new Error('Unauthorized')
    }
    config.headers.Authorization = `Bearer ${session.user.accessToken}`
  }

  if (cache) {
    const cacheKey = `${config.url}:${config.method}:${JSON.stringify(config.params)}`

    return await unstable_cache(async () => await http<T>(config), [cacheKey], cache)()
  }
  return await http<T>(config)
}
