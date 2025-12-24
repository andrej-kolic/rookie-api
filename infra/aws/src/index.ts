import serverlessExpress from '@vendia/serverless-express';

// Set dummy env vars before any imports to prevent ts-kraken from crashing
// This is necessary because some libraries might validate env vars on import
if (!process.env.KRAKEN_API_KEY) {
  process.env.KRAKEN_API_KEY = 'dummy';
}
if (!process.env.KRAKEN_API_SECRET) {
  process.env.KRAKEN_API_SECRET = 'dummy';
}

// Import the Express app from the workspace package
// esbuild will bundle the TypeScript source directly
import { app } from '@repo/kraken-proxy';

// Export the handler for AWS Lambda
export const handler = serverlessExpress({ app });
