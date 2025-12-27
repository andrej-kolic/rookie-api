import { privateRestRequest, getWsAuthToken } from 'ts-kraken';

export class KrakenService {
  public async getWsToken(creds: { apiKey: string; apiSecret: string }) {
    return await getWsAuthToken(creds);
  }

  public async getBalance(creds: { apiKey: string; apiSecret: string }) {
    return await privateRestRequest({ url: 'Balance' }, creds);
  }
}
