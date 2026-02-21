import express from 'express';
import { checkDatabaseHealth } from '../src/config/db.config.js';

const router = express.Router();

router.get('/', (req, res, _next) => {
  res.json({ message: 'OK', title: 'Express' });
});

router.get('/health', async (req, res, _next) => {
  const result = await checkDatabaseHealth();
  const status = result.status === 'healthy' ? 200 : 503;
  res.status(status).json(result);
});

export default router;
