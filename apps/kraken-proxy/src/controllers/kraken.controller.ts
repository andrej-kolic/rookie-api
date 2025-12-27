import type { Request, Response, NextFunction } from 'express';
import { KrakenService } from '../services/kraken.service';
import type { AuthRequest } from '../middleware/auth.middleware';

export class KrakenController {
  /**
   * Dependency Injection: KrakenService is injected via the constructor.
   */
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
        res
          .status(401)
          .json({
            error:
              'Authentication credentials are required but were not provided.',
          });
        return;
      }

      const token = await this.krakenService.getWsToken(req.credentials);
      res.json({ result: { token } });
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
        res
          .status(401)
          .json({
            error:
              'Authentication credentials are required but were not provided.',
          });
        return;
      }

      const balance = await this.krakenService.getBalance(req.credentials);
      res.json(balance);
    } catch (error) {
      next(error);
    }
  };
}
