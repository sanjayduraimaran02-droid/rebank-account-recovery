/**
 * Centralized error handling middleware
 */
function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';

  if (statusCode >= 500) {
    console.error('[API 5xx Error]:', err.stack || err);
  } else {
    console.warn(`[API ${statusCode} Client Notice]:`, err.message);
  }
  
  // Safe user-facing error message (do not expose internal database/system stack traces in production)
  const message = (statusCode === 500 && process.env.NODE_ENV === 'production')
    ? 'An unexpected error occurred while processing your request. Please contact support.'
    : err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: message,
      details: err.details || null
    }
  });
}

module.exports = {
  errorHandler
};
