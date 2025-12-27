// TODO: move to separate file
import dotenv from 'dotenv';
import { app } from './app';
import { config } from './config';

// TODO: move to separate file
// In Lambda, don't try to load .env file
if (process.env.AWS_LAMBDA_FUNCTION_NAME === undefined) {
  dotenv.config();
}

// TODO: move to separate file
// Only start server if not running in Lambda
if (process.env.AWS_LAMBDA_FUNCTION_NAME === undefined) {
  app.listen(config.port, () => {
    console.log(`Kraken Proxy listening at http://localhost:${config.port}`);
  });
}
