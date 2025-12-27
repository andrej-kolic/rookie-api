import { encrypt, decrypt, type EncryptedData } from '../utils/crypto.util';

export class AuthService {
  public createToken(apiKey: string, apiSecret: string): string {
    const payload = {
      key: encrypt(apiKey),
      secret: encrypt(apiSecret),
    };
    return Buffer.from(JSON.stringify(payload)).toString('base64');
  }

  public decryptToken(tokenStr: string) {
    const jsonStr = Buffer.from(tokenStr, 'base64').toString('utf8');
    const payload = JSON.parse(jsonStr) as {
      key: EncryptedData;
      secret: EncryptedData;
    };

    return {
      apiKey: decrypt(payload.key),
      apiSecret: decrypt(payload.secret),
    };
  }
}
