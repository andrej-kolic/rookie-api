import request from 'supertest';
import { app } from '../../src/app';
import * as tsKraken from 'ts-kraken';

// Mock the external library so we don't hit real Kraken servers
jest.mock('ts-kraken', () => ({
  getWsAuthToken: jest.fn(),
  privateRestRequest: jest.fn(),
}));

const mockedTsKraken = tsKraken as jest.Mocked<typeof tsKraken>;

describe('Integration Tests: Kraken Proxy API', () => {
  describe('POST /login', () => {
    it('should return a base64 token when valid credentials are provided', async () => {
      const response = await request(app).post('/login').send({
        apiKey: 'my-api-key',
        apiSecret: 'my-api-secret',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      // Verify it looks like a base64 string
      expect(typeof (response.body as { token?: unknown }).token).toBe(
        'string',
      );
    });
  });

  describe('GET /ws-token', () => {
    it('should return 401 if no Authorization header is present', async () => {
      const response = await request(app).get('/ws-token');

      expect(response.status).toBe(401);
      expect((response.body as { message?: string }).message).toBe(
        'No credentials provided',
      );
    });

    it('should return 200 and the token if a valid login token is used', async () => {
      // 1. First, get a token from login
      const loginRes = await request(app)
        .post('/login')
        .send({ apiKey: 'valid-key-12345', apiSecret: 'valid-secret-12345' });

      const token = (loginRes.body as { token: string }).token;

      // 2. Mock the internal Kraken library response
      mockedTsKraken.getWsAuthToken.mockResolvedValue('mocked-kraken-ws-token');

      // 3. Use the token to access protected route
      const response = await request(app)
        .get('/ws-token')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(
        (response.body as { result?: { token?: string } }).result?.token,
      ).toBe('mocked-kraken-ws-token');
    });
  });
});
