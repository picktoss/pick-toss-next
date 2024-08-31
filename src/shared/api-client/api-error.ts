export class ApiError extends Error {
  public readonly status: number
  public readonly url: string
  constructor(message: string, data: { status: number; url: string }) {
    super(message)
    this.name = 'ApiError'
    this.status = data.status
    this.url = data.url
  }
}
