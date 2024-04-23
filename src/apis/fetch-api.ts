import QS from 'qs'
import { ApiError } from './api-error'

interface FetchAPIParams {
  url: string
  options?: {
    queryOptions?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query?: Record<string, any>
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
      headers: {
        'Context-Type': 'application/json',
      },
      ...options?.fetchOption,
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
