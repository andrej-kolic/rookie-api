# 🚀 Project Roadmap & Next Steps

This document details the planned improvements for the Kraken Proxy API to enhance security, reliability, and maintainability.

---

## 1. Robust Input Validation (Zod)

Currently, the application performs manual type checks and length validation within the controllers and helper functions. To improve this, we will implement **Zod** schemas.

- **Centralized Schemas**: Define strict data structures for login payloads and API parameters.
- **Validation Middleware**: Intercept requests before they reach the controller to ensure data integrity.
- **Error Integration**: Automatically trigger the `AppError` flow when validation fails.

## 2. Enhanced Token Security

The current stateless token is a Base64-encoded string of encrypted credentials.

- **Expiration (TTL)**: Add an `issuedAt` timestamp to the encrypted payload to invalidate tokens after a set duration (e.g., 24 hours).
- **JWT Transition**: Wrap the encrypted payload in a signed JSON Web Token (JWT) to prevent tampering and simplify expiration handling.
- **Rotation**: Implement a mechanism to rotate the `appSecret` without losing access to active sessions.

## 3. Structured Logging

The system currently relies on `console.log` and `console.error` for debugging.

- **Professional Logger**: Integrate **Pino** or **Winston** for structured JSON logging.
- **Traceability**: Attach a unique `requestId` to every log entry to track a single request across middleware and services.
- **Error Depth**: Configure the `errorMiddleware` to log full stack traces only for non-operational errors (500s).

## 4. API Rate Limiting

To protect the Kraken API keys from being throttled due to proxy abuse:

- **Global Limits**: Restrict the total number of requests per IP address.
- **Endpoint Specific Limits**: Apply stricter limits to sensitive routes like `/login`.
- **Headers**: Provide `Retry-After` headers to clients when limits are exceeded.

## 5. Advanced Testing Suite

While integration tests currently verify the core flow and 401 handling, the suite can be expanded:

- **Code Coverage**: Target 90%+ coverage for the `AuthService` and `authMiddleware`.
- **Mocking External Failures**: Simulate Kraken API timeouts or 502 errors to verify graceful degradation in the proxy.
- **Load Testing**: Verify how the proxy handles concurrent WebSocket token requests.

## 6. Configuration Management

The app currently imports a static `config` object.

- **Environment Validation**: Use `dotenv` with a validator (like `envalid`) to ensure `APP_SECRET` and `PORT` are defined before the server starts.
- **Secret Management**: Move away from hardcoded defaults in the `config.ts` file to ensure security in production environments.
