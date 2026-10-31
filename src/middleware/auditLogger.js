const { run } = require('../db/database');
const crypto = require('crypto');

/**
 * Sanitizes an object by recursively redacting sensitive security fields
 */
function sanitizePayload(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const sensitiveKeys = ['password', 'password_hash', 'pin', 'cvv', 'otp', 'token', 'secret', 'mfa_secret', 'card_number'];
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizePayload);
  }

  const clean = {};
  for (const [key, value] of Object.entries(obj)) {
    if (sensitiveKeys.some(s => key.toLowerCase().includes(s))) {
      clean[key] = '[REDACTED_FOR_SECURITY]';
    } else if (typeof value === 'object' && value !== null) {
      clean[key] = sanitizePayload(value);
    } else {
      clean[key] = value;
    }
  }
  return clean;
}

/**
 * Records an immutable audit log entry in the database
 */
function recordAudit({ actorId, actorRole, action, entityType, entityId, ipAddress, userAgent, details }) {
  try {
    const id = 'aud-' + crypto.randomUUID();
    const cleanDetails = sanitizePayload(details);
    const detailsJson = typeof cleanDetails === 'string' ? cleanDetails : JSON.stringify(cleanDetails || {});
    const now = new Date().toISOString();

    run(
      `INSERT INTO audit_events (id, actor_id, actor_role, action, entity_type, entity_id, ip_address, user_agent, details, timestamp)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        actorId || null,
        actorRole || 'SYSTEM',
        action,
        entityType || 'SYSTEM',
        entityId || null,
        ipAddress || '127.0.0.1',
        userAgent || 'Unknown',
        detailsJson,
        now
      ]
    );
  } catch (err) {
    console.error('[AuditLog Error]: Failed to write audit event:', err.message);
  }
}

/**
 * Express middleware to automatically log mutating API actions
 */
function auditMiddleware(actionName, entityType) {
  return (req, res, next) => {
    // Intercept response finish
    const originalSend = res.send;
    res.send = function (data) {
      res.send = originalSend;
      res.send.apply(res, arguments);

      // Only record on 2xx responses or explicitly specified actions
      if (res.statusCode >= 200 && res.statusCode < 300) {
        recordAudit({
          actorId: req.user ? req.user.id : null,
          actorRole: req.user ? req.user.role : 'ANONYMOUS',
          action: actionName || `${req.method}_${req.baseUrl}${req.path}`,
          entityType: entityType || 'API_CALL',
          entityId: req.params.id || null,
          ipAddress: req.ip || req.connection.remoteAddress,
          userAgent: req.headers['user-agent'],
          details: {
            method: req.method,
            path: req.originalUrl,
            params: req.params,
            query: req.query,
            body: sanitizePayload(req.body)
          }
        });
      }
    };
    next();
  };
}

module.exports = {
  recordAudit,
  sanitizePayload,
  auditMiddleware
};
