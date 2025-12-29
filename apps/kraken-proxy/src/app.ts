import express, { type Express } from 'express';
import cors from 'cors';
import { AuthService } from './services/auth.service';
import { KrakenService } from './services/kraken.service';
import { KrakenController } from './controllers/kraken.controller';
import { authMiddleware } from './middleware/auth.middleware';
import { errorMiddleware } from './middleware/error.middleware';

interface LoginBody {
  apiKey: string;
  apiSecret: string;
}

const app: Express = express();
app.use(cors());
app.use(express.json());

// 1. Instantiate Services
const authService = new AuthService();
const krakenService = new KrakenService();

// 2. Instantiate Controllers with Injected Services
const krakenController = new KrakenController(krakenService);

// 3. Define Routes
app.post('/login', (req, res) => {
  const { apiKey, apiSecret } = req.body as LoginBody;
  const token = authService.createToken(apiKey, apiSecret);
  res.json({ token });
});

// Protected Routes using Middleware
const protectedAuth = authMiddleware(authService);

app.get('/', krakenController.getHello);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/ws-token', protectedAuth, krakenController.getWsToken);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/balance', protectedAuth, krakenController.getBalance);

// Error Handler Middleware
app.use(errorMiddleware);

export { app };
