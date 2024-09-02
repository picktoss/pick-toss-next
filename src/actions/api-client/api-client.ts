import QS from 'qs'
import { Endpoint } from '../endpoints/types'
import { ApiResponse } from './types'
import { ApiError } from './api-error'
import { ServerEnv } from './server-env'
import { auth } from '@/app/api/auth/[...nextauth]/auth'

interface Config {
  baseUrl: string
  revalidate: number
}

interface FetchParams {
  endpoint: Endpoint
  headers?: HeadersInit
  query?: object
  body?: object
  next?: {
    revalidate: number
  }
}

class ApiClient {
  constructor(private readonly config: Config) {}

  async fetch<T extends ApiResponse>(params: FetchParams): Promise<T> {
    const headers = await this.getHeaders(params)

    const response = await fetch(this.getUrl({ endpoint: params.endpoint, query: params.query }), {
      method: params.endpoint.method,
      headers,
      body: this.getBody(params.body),
      next: this.getNextOptions(params.next),
    })

    return this.handleResponse<T>(params, response)
  }

  private getUrl({ endpoint, query }: Pick<FetchParams, 'endpoint' | 'query'>): string {
    const searchParamsUrl = query ? `?${QS.stringify(query)}` : ''
    return `${this.config.baseUrl}${endpoint.url}${searchParamsUrl}`
  }

  private async getHeaders(params: FetchParams): Promise<Headers> {
    const headers = new Headers(params.headers)

    if (params.endpoint.auth) {
      const session = await auth()
      headers.set('Authorization', `Bearer ${session?.user.accessToken}`)
    }

    if (!(params.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }

    return headers
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
      console.error(await res.json())
      const url = this.getUrl(params)
      throw new ApiError(`${res.statusText}: [${params.endpoint.method}] ${url}`, {
        status: res.status,
        url,
      })
    }

    const data = (await res.json().catch(() => ({}))) as T
    return data
  }
}

export const apiClient = new ApiClient({
  baseUrl: ServerEnv.apiUrl(),
  revalidate: 0,
})
