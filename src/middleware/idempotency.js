// In-memory idempotency cache with TTL
const idempotencyCache = new Map();
const TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Middleware supporting Idempotency-Key header for sensitive operations
 */
function idempotencyMiddleware(req, res, next) {
  const idempotencyKey = req.headers['idempotency-key'] || req.headers['x-idempotency-key'];
  if (!idempotencyKey) {
    return next();
  }

  const cacheKey = `${req.method}:${req.baseUrl}${req.path}:${idempotencyKey}`;
  const cached = idempotencyCache.get(cacheKey);

  if (cached) {
    const isExpired = Date.now() - cached.timestamp > TTL_MS;
    if (!isExpired) {
      if (cached.status === 'PENDING') {
        return res.status(409).json({
          success: false,
          error: {
            code: 'IDEMPOTENT_OPERATION_IN_FLIGHT',
            message: 'A request with this idempotency key is currently processing. Please wait.'
          }
        });
      }

      res.setHeader('X-Cache-Lookup', 'HIT');
      res.setHeader('X-Idempotent-Replay', 'true');
      return res.status(cached.statusCode).json(cached.body);
    }
  }

  // Mark as pending
  idempotencyCache.set(cacheKey, {
    status: 'PENDING',
    timestamp: Date.now()
  });

  // Intercept json response
  const originalJson = res.json;
  res.json = function (body) {
    idempotencyCache.set(cacheKey, {
      status: 'COMPLETED',
      statusCode: res.statusCode,
      body,
      timestamp: Date.now()
    });
    return originalJson.call(this, body);
  };

  next();
}

module.exports = {
  idempotencyMiddleware
};
