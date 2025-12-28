import type { Request, Response, NextFunction } from 'express';
import { KrakenService } from '../services/kraken.service';
import type { AuthRequest } from '../middleware/auth.middleware';
import { AppError } from '../utils/app-error';

export class KrakenController {
  constructor(private krakenService: KrakenService) {}

  public getHello = (req: Request, res: Response) => {
    res.send('Kraken Proxy is running');
  };

  public getWsToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.credentials) {
        throw new AppError('Authentication credentials required.', 401);
      }

      const token = await this.krakenService.getWsToken(req.credentials);
      res.status(200).json({ result: { token } });
    } catch (error) {
      next(error);
    }
  };

  public getBalance = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.credentials) {
        throw new AppError('Authentication credentials required.', 401);
      }

      const balance = await this.krakenService.getBalance(req.credentials);
      res.status(200).json(balance);
    } catch (error) {
      next(error);
    }
  };
}
