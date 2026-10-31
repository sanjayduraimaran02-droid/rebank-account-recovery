const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Load environment variables if .env exists (respecting existing process.env values)
if (fs.existsSync(path.join(__dirname, '..', '.env'))) {
  const envContent = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [k, ...v] = trimmed.split('=');
      const key = k ? k.trim() : '';
      if (key && v.length && (process.env[key] === undefined || process.env[key] === '')) {
        process.env[key] = v.join('=').trim();
      }
    }
  });
}

const { getDb, get } = require('./db/database');
const { seed } = require('./db/seed');
const { apiLimiter } = require('./middleware/rateLimiter');
const { errorHandler } = require('./middleware/errorHandler');

// Route modules
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const recoveryRoutes = require('./routes/recoveryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const fraudRoutes = require('./routes/fraudRoutes');
const privacyRoutes = require('./routes/privacyRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Security & Parsing Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, native requests) or Capacitor / local network origins
    if (!origin) return callback(null, true);
    if (process.env.CORS_ORIGIN && process.env.CORS_ORIGIN !== '*') {
      return callback(null, origin === process.env.CORS_ORIGIN);
    }
    // Echo back the requesting origin to satisfy credentials: true for Capacitor, emulators, and LAN testing
    return callback(null, origin);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Idempotency-Key', 'X-Idempotency-Key'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Global rate limiting for API
app.use('/api', apiLimiter);

// Static Asset Serving with No-Cache Headers for Immediate Live Updates
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});
app.use(express.static(path.join(__dirname, '..', 'public'), { etag: false, lastModified: false }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Mount API Endpoints
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/recovery', recoveryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/fraud', fraudRoutes);
app.use('/api/privacy', privacyRoutes);
app.use('/api/chat', chatRoutes);

// Catch-all route to serve the Single Page Application
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(__dirname, '..', 'public', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('ReBank frontend assets not initialized yet.');
  }
});

// Centralized error handling
app.use(errorHandler);

// Boot database & server
function startServer() {
  try {
    getDb(); // Ensure tables are created
    
    // Check if users table is populated; if not, seed automatically
    const userCount = get('SELECT COUNT(*) as count FROM users');
    if (!userCount || userCount.count === 0) {
      console.log('[Server] Database is uninitialized. Running initial seed...');
      seed();
    }

    const port = process.env.PORT || 3000;

    const server = app.listen(port, () => {
      console.log(`====================================================`);
      console.log(`  ReBank Account Recovery Platform API Online`);
      console.log(`  Local URL:   http://localhost:${port}`);
      console.log(`  Health Check: http://localhost:${port}/api/health`);
      console.log(`  OpenAPI Spec: http://localhost:${port}/api/docs`);
      console.log(`  Database:     SQLite Persistent Relational Storage`);
      console.log(`====================================================`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`\n[Server Startup Error]: Port ${port} is already in use by another process.`);
        console.error(`To resolve this conflict:`);
        console.error(`1. Check for another running ReBank instance or stop the process using port ${port} (e.g., via Task Manager or 'netstat -ano | findstr :${port}').`);
        console.error(`2. Or configure an alternate port using the PORT environment variable (e.g., PORT=3001 npm start).\n`);
        process.exit(1);
      } else {
        console.error('[Server Error]:', err);
        process.exit(1);
      }
    });

    return server;
  } catch (err) {
    console.error('[Server Startup Failure]:', err);
    throw err;
  }
}

process.on('uncaughtException', (err) => {
  console.error('[Process Uncaught Exception]:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[Process Unhandled Rejection]:', reason);
});

process.on('exit', (code) => {
  console.log(`[Process Exit]: Exiting with code ${code}`);
});

process.on('SIGINT', () => {
  console.log('[Process Signal]: SIGINT received. Shutting down gracefully.');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('[Process Signal]: SIGTERM received. Shutting down gracefully.');
  process.exit(0);
});

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
