import QS from 'qs'
import { ApiError } from './api-error'

interface FetchAPIParams {
  url: string
  options?: {
    queryOptions?: {
      query?: Record<string, unknown>
      options?: QS.IStringifyOptions
    }
    fetchOption?: Omit<RequestInit, 'next'>
    nextCache?: NextFetchRequestConfig
  }
}

const DEFAULT_REVALIDATE = 0

export const fetchAPI = async <T = unknown>(params: FetchAPIParams): Promise<T> => {
  const { url, options } = params
  const query = QS.stringify(options?.queryOptions?.query ?? {}, options?.queryOptions?.options)
  const urlWithQuery = query ? `${url}?${query}` : url

  try {
    const res = await fetch(urlWithQuery, {
      ...options?.fetchOption,
      headers: {
        'Context-Type': 'application/json',
        ...params?.options?.fetchOption?.headers,
      },
      next: {
        ...options?.nextCache,
        revalidate: options?.nextCache?.revalidate || DEFAULT_REVALIDATE,
      },
    })

    if (!res.ok) {
      throw new ApiError(
        `${res.statusText}: [${options?.fetchOption?.method || 'GET'}] ${urlWithQuery}`,
        {
          status: res.status,
          url,
          query,
        },
      )
    }

    const data = (await res.json()) as T

    return data
  } catch {
    throw new Error('some error occurred')
  }
}
