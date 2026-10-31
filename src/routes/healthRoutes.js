const express = require('express');
const router = express.Router();
const { get } = require('../db/database');
const { mockBankAdapter } = require('../services/bankIntegration/MockBankAdapter');
const { getAllLockReasons } = require('../services/restrictionService');

/**
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  let dbStatus = 'DISCONNECTED';
  try {
    const test = get('SELECT 1 as alive');
    if (test && test.alive === 1) {
      dbStatus = 'CONNECTED_PERSISTENT_SQLITE';
    }
  } catch (err) {
    dbStatus = 'ERROR: ' + err.message;
  }

  res.json({
    status: 'HEALTHY',
    service: 'ReBank Account Recovery Platform API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: dbStatus,
      driver: 'SQLite persistent local adapter (Node 24 native DatabaseSync)',
      schemaVersion: '1.0.0-relational',
      note: 'To use PostgreSQL, install PostgreSQL and configure DATABASE_URL in .env'
    },
    coreBanking: {
      status: 'ONLINE',
      adapter: 'MockBankAdapter (Provider-Neutral Sandbox)',
      connectedCore: 'SIMULATED_FINACLE_CORE_V11',
      latencyMs: mockBankAdapter.latencyMs,
      productionBankingActionsEnabled: mockBankAdapter.isProductionAuthorized()
    }
  });
});

/**
 * Database readiness probe
 */
router.get('/ready', (req, res) => {
  try {
    const test = get('SELECT COUNT(*) as count FROM users');
    if (test && typeof test.count === 'number') {
      return res.status(200).json({
        status: 'READY',
        database: 'CONNECTED_PERSISTENT',
        ready: true,
        userRecordsSeeded: test.count,
        timestamp: new Date().toISOString()
      });
    }
    return res.status(503).json({ status: 'UNREADY', database: 'INITIALIZING', ready: false });
  } catch (err) {
    return res.status(503).json({ status: 'UNREADY', error: err.message, ready: false });
  }
});

/**
 * Public catalog of real bank account lock reasons & unlock guides
 */
router.get('/lock-reasons', (req, res) => {
  const reasons = getAllLockReasons();
  res.json({
    success: true,
    data: reasons,
    count: reasons.length
  });
});

/**
 * OpenAPI 3.0.0 Specification
 */
router.get('/docs', (req, res) => {
  res.json({
    openapi: '3.0.0',
    info: {
      title: 'ReBank - Bank Account Recovery Platform API',
      version: '1.0.0',
      description: 'RESTful API for omnichannel bank account recovery orchestration, Maker-Checker review, and CBS release.'
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3000}`, description: 'Local Development Server' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    paths: {
      '/api/health': {
        get: { summary: 'System health check', responses: { '200': { description: 'API and database health status' } } }
      },
      '/api/auth/register': {
        post: { summary: 'Customer registration', responses: { '201': { description: 'Registration success with JWT token' } } }
      },
      '/api/auth/login': {
        post: { summary: 'Authenticate user', responses: { '200': { description: 'JWT authentication token' } } }
      },
      '/api/customer/accounts': {
        get: { summary: 'Retrieve customer bank accounts and active holds', security: [{ bearerAuth: [] }] }
      },
      '/api/customer/restriction/{accountId}': {
        get: { summary: 'Evaluate restriction diagnostics & recovery eligibility', security: [{ bearerAuth: [] }] }
      },
      '/api/recovery/submit': {
        post: { summary: 'Submit new recovery application', security: [{ bearerAuth: [] }] }
      },
      '/api/recovery/my-requests': {
        get: { summary: 'List customer recovery applications', security: [{ bearerAuth: [] }] }
      },
      '/api/recovery/{id}': {
        get: { summary: 'Get recovery ticket details and timeline', security: [{ bearerAuth: [] }] }
      },
      '/api/admin/queue/reviewer': {
        get: { summary: 'L1 Maker triage queue', security: [{ bearerAuth: [] }] }
      },
      '/api/admin/queue/approver': {
        get: { summary: 'L2 Checker authorization queue (Four-Eyes principle)', security: [{ bearerAuth: [] }] }
      },
      '/api/admin/case/{id}/authorize': {
        post: { summary: 'Authorize unfreeze and trigger Core Banking System hold release', security: [{ bearerAuth: [] }] }
      },
      '/api/admin/audit-logs': {
        get: { summary: 'Immutable audit trail with actor and entity filters', security: [{ bearerAuth: [] }] }
      }
    }
  });
});

module.exports = router;
