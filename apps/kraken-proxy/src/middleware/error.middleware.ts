import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';

export const errorMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // If it's our custom AppError, use its status code
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // For unexpected errors (bugs), log them and send a generic 500
  console.error('UNEXPECTED ERROR 💥:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};
