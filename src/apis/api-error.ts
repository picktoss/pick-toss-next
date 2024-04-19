export class ApiError extends Error {
  public readonly status: number
  public readonly url: string
  public readonly query?: string
  constructor(message: string, data: { status: number; url: string; query: string }) {
    super(message)
    this.name = 'ApiError'
    this.status = data.status
    this.url = data.url
    this.query = data.query
  }
}
