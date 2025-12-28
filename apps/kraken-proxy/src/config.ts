export const config = {
  port: process.env.PORT ?? 3000,

  // TODO: Warn if using default secret
  appSecret:
    process.env.APP_SECRET ??
    'dev-secret-do-not-use-in-prod-01234567890123456789012345678901',
};

console.log('Configuration Loaded:', config);
