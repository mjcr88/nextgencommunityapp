export class AppError extends Error {
  public readonly code: string
  public readonly statusCode: number
  public readonly cause?: Error

  constructor(
    message: string,
    options: { code: string; statusCode?: number; cause?: Error } = { code: 'INTERNAL_ERROR' }
  ) {
    super(message)
    this.name = 'AppError'
    this.code = options.code
    this.statusCode = options.statusCode ?? 500
    if (options.cause) {
      this.cause = options.cause
    }
  }
}
