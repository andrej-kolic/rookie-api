import { privateRestRequest, getWsAuthToken } from 'ts-kraken';

export class KrakenService {
  public getWsToken = async (creds: { apiKey: string; apiSecret: string }) => {
    return await getWsAuthToken(creds);
  };

  public getBalance = async (creds: { apiKey: string; apiSecret: string }) => {
    return await privateRestRequest({ url: 'Balance' }, creds);
  };
}
