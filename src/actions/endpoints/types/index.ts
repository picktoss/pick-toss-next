type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export type Endpoint = {
  url: string
  method: HttpMethod
  auth?: boolean
}
