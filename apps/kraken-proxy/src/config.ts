
export const config = {
  port: process.env.PORT ?? 3000,
  // kraken: {
  //   apiKey: process.env.KRAKEN_API_KEY ?? '',
  //   apiSecret: process.env.KRAKEN_API_SECRET ?? '',
  // },

  // TODO: warn if using default secret
  appSecret:
    process.env.APP_SECRET ??
    'dev-secret-do-not-use-in-prod-01234567890123456789012345678901',
};

console.log('Configuration Loaded:', config);

// if (!config.kraken.apiKey || !config.kraken.apiSecret) {
//   console.warn(
//     'WARNING: KRAKEN_API_KEY or KRAKEN_API_SECRET is missing via .env',
//   );
// }
