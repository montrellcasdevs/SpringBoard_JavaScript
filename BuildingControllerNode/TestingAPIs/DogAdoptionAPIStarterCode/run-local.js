const { MongoMemoryServer } = require('mongodb-memory-server');
const connectDB = require('./db');
const app = require('./app');

(async () => {
  try {
    console.log('[run-local] Starting in-memory MongoDB');
    const mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    process.env.MONGO_URI = uri;
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

    console.log('[run-local] Connecting app to in-memory MongoDB');
    await connectDB();

    const port = process.env.PORT || 3000;
    const srv = app.listen(port, () => console.log(`[run-local] App listening on http://localhost:${port}`));

    // Graceful shutdown
    const shutdown = async () => {
      console.log('[run-local] Shutting down');
      srv.close();
      await mongo.stop();
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error('[run-local] Failed to start', err);
    process.exit(1);
  }
})();
