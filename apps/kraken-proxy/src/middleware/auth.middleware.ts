import type { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

// Extend Express Request type to include credentials
export interface AuthRequest extends Request {
  credentials?: { apiKey: string; apiSecret: string };
}

export const authMiddleware = (authService: AuthService) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No credentials provided' });
    }

    try {
      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new Error('No token found');
      }

      // Decrypt token and attach credentials to request object
      req.credentials = authService.decryptToken(token);
      next();
    } catch {
      res.status(401).json({ error: 'Invalid authentication token' });
    }
  };
};
