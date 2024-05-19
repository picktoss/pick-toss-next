import { ServerEnv } from '@/apis/server-env'
import { ApiError } from './api-error'
import QS from 'qs'

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface ApiResponse {}

interface Config {
  baseUrl: string
  revalidate: number
}

interface FetchParams {
  url: string
  method: HttpMethod
  headers?: HeadersInit
  query?: object
  body?: object
  next?: {
    revalidate: number
  }
}

class ApiClient {
  constructor(private readonly config: Config) {}

  async fetch<T extends ApiResponse>(params: FetchParams) {
    const response = await fetch(this.getUrl(params), {
      headers: this.getHeaders(params.headers, params.body),
      next: this.getNextOptions(params.next),
      body: this.getBody(params.body),
      method: params.method,
    })

    return {
      data: await this.handleResponse<T>(params, response),
    }
  }

  private getUrl({ url, query }: Pick<FetchParams, 'url' | 'query'>): string {
    const searchParamsUrl = query ? `?${QS.stringify(query)}` : ''
    return `${this.config.baseUrl}${url}${searchParamsUrl}`
  }

  private getHeaders(headers?: FetchParams['headers'], body?: FetchParams['body']): HeadersInit {
    if (body instanceof FormData) {
      return {
        ...(headers || {}),
      }
    }

    return {
      'Content-Type': 'application/json',
      ...(headers || {}),
    }
  }

  private getNextOptions(next: FetchParams['next']): NextFetchRequestConfig | undefined {
    return {
      revalidate: next?.revalidate ?? this.config.revalidate,
      ...next,
    }
  }

  private getBody(body?: FetchParams['body']): string | FormData | undefined {
    if (!body) {
      return undefined
    }
    if (body instanceof FormData) {
      return body
    }
    return JSON.stringify(body)
  }

  private async handleResponse<T extends ApiResponse>(params: FetchParams, res: Response) {
    if (!res.ok) {
      const url = this.getUrl(params)
      throw new ApiError(`${res.statusText}: [${params.method}] ${url}`, {
        status: res.status,
        url,
      })
    }

    const data = (await res.json()) as T
    return data
  }
}

export const apiClient = new ApiClient({
  baseUrl: ServerEnv.apiUrl(),
  revalidate: 0,
})
