export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // isOperational distinguishes between expected errors (404, 401)
    // and programming bugs (ReferenceError, etc.)
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
