// filepath: /Users/andrejkolic/dev/playground/kraken/rookie-api/apps/kraken-proxy/test/test-setup.ts
// import dotenv from 'dotenv';

// Load .env file (now renamed from _.env)
// dotenv.config();

// Set dummy env vars before any imports to prevent ts-kraken from crashing
process.env.KRAKEN_API_KEY ??= 'dummy';

process.env.KRAKEN_API_SECRET ??= 'dummy';
