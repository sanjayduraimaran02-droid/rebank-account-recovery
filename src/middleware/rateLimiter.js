const rateLimit = require('express-rate-limit');

/**
 * Determines whether a request should be exempted from rate limiting.
 * Strict production rate limiting is fully preserved:
 * - In production (process.env.NODE_ENV === 'production'), rate limiting is ALWAYS strictly enforced.
 * - In test environment (process.env.NODE_ENV === 'test'), rate limiting is skipped.
 * - In development / testing, requests carrying internal test headers ('x-test-runner',
 *   'x-rebank-test', 'x-bypass-rate-limit') are skipped so test suites run independently
 *   without exhausting the IP quota on localhost.
 */
function isTestExempt(req) {
  // In production (NODE_ENV === 'production'), rate limiting is ALWAYS strictly enforced
  if (process.env.NODE_ENV === 'production') {
    return false;
  }
  // In automated test environments
  if (process.env.NODE_ENV === 'test') {
    return true;
  }
  // Check test runner headers
  const testHeader = req.headers['x-test-runner'] || req.headers['x-rebank-test'] || req.headers['x-bypass-rate-limit'];
  if (
    testHeader === 'rebank-internal-audit' ||
    testHeader === 'true' ||
    testHeader === 'test-runner-internal'
  ) {
    return true;
  }
  // Loopback / localhost test requests in development mode
  const clientIp = req.ip || req.connection?.remoteAddress || req.socket?.remoteAddress || '';
  if (clientIp === '127.0.0.1' || clientIp === '::1' || clientIp === '::ffff:127.0.0.1' || clientIp.endsWith('127.0.0.1')) {
    return true;
  }
  return false;
}

/**
 * Standard API rate limiter:
 * - Production: 120 requests per minute
 * - Non-production: 5000 requests per minute with test bypass
 */
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 120 : 5000,
  standardHeaders: true,
  legacyHeaders: false,
  skip: isTestExempt,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests created from this IP, please try again after 60 seconds.'
    }
  }
});

/**
 * Stricter auth rate limiter:
 * - Production: 30 attempts per 15 minutes to prevent brute-force attacks
 * - Non-production: 1000 attempts per 15 minutes with test bypass
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 30 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  skip: isTestExempt,
  message: {
    success: false,
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts. Please try again after 15 minutes.'
    }
  }
});

module.exports = {
  apiLimiter,
  authLimiter,
  isTestExempt
};
