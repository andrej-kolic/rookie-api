import { KrakenController } from '../kraken.controller';
import { KrakenService } from '../../services/kraken.service';
import type { AuthRequest } from '../../middleware/auth.middleware';
import type { Response, NextFunction } from 'express';
import { AppError } from '../../utils/app-error';

describe('KrakenController', () => {
  let krakenController: KrakenController;
  let mockKrakenService: jest.Mocked<KrakenService>;
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: jest.Mocked<Partial<Response>>;
  let nextFunction: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    // 1. Create a mock version of the KrakenService
    mockKrakenService = {
      getWsToken: jest.fn(),
      getBalance: jest.fn(),
    } as jest.Mocked<KrakenService>;

    // 2. Inject the mock service into the controller
    krakenController = new KrakenController(mockKrakenService);

    // 3. Setup mock Express objects
    mockRequest = {}; // Initially empty to simulate missing credentials
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as jest.Mocked<Partial<Response>>;
    nextFunction = jest.fn() as jest.MockedFunction<NextFunction>;
  });

  it('should call next with an AppError if credentials are missing', async () => {
    // Act: Call the controller method
    await krakenController.getWsToken(
      mockRequest as AuthRequest,
      mockResponse as Response,
      nextFunction
    );

    // Assert: Check if next was called with the specific AppError
    expect(nextFunction).toHaveBeenCalledWith(expect.any(AppError));

    const errorArg = nextFunction.mock.calls[0]?.[0] as unknown as AppError;
    expect(errorArg.statusCode).toBe(401);
    expect(errorArg.message).toBe('Authentication credentials required.');
  });

  it('should call service and return 200 if credentials exist', async () => {
    // Arrange: Add credentials to the request
    mockRequest.credentials = { apiKey: 'test-key', apiSecret: 'test-secret' };
    mockKrakenService.getWsToken.mockResolvedValue('fake-ws-token');

    // Act
    await krakenController.getWsToken(
      mockRequest as AuthRequest,
      mockResponse as Response,
      nextFunction
    );

    // Assert
    expect(mockKrakenService.getWsToken).toHaveBeenCalledWith(mockRequest.credentials);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ result: { token: 'fake-ws-token' } });
  });
});
