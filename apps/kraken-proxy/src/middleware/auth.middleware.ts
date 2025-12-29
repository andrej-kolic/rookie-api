import type { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AppError } from '../utils/app-error';

// Extend Express Request type to include credentials
export interface AuthRequest extends Request {
  credentials?: { apiKey: string; apiSecret: string };
}

export const authMiddleware = (authService: AuthService) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Check if the header exists and starts with Bearer
    if (!authHeader?.startsWith('Bearer ')) {
      // Instead of res.status(401).json(...), pass an AppError to next()
      next(new AppError('No credentials provided', 401));
      return;
    }

    try {
      const token = authHeader.split(' ')[1];
      if (!token) {
        next(new AppError('Invalid authentication token', 401));
        return;
      }
      req.credentials = authService.decryptToken(token);
      next();
    } catch {
      // Pass decryption errors to the global handler as well
      next(new AppError('Invalid authentication token', 401));
    }
  };
};
