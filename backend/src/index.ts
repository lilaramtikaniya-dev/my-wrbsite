import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import { createRateLimiter } from './middleware/rateLimit';
import runRouter from './routes/run';
import leaderboardRouter from './routes/leaderboard';
import healthRouter from './routes/health';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet({ crossOriginEmbedderPolicy: false, contentSecurityPolicy: false }));
app.use(corsMiddleware);
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const apiLimiter = createRateLimiter(15 * 60 * 1000, 100);
const runLimiter = createRateLimiter(60 * 1000, 30);

app.use('/api', apiLimiter);
app.use('/api/run', runLimiter);

app.use('/health', healthRouter);
app.use('/api/run', runRouter);
app.use('/api/leaderboard', leaderboardRouter);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'JSForge Runtime API',
    version: '1.0.0',
    status: 'running',
    endpoints: ['GET /health', 'POST /api/run', 'GET /api/leaderboard', 'POST /api/leaderboard'],
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found', message: 'Endpoint does not exist.' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n⚡ JSForge Runtime API`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`🚀 http://localhost:${PORT}`);
  console.log(`🌍 ${process.env.NODE_ENV || 'development'}\n`);
});

export default app;
