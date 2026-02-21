import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import router from './routes/index.js';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const rootDir = process.cwd();
const app = express();

const isProduction = process.env.NODE_ENV === 'production';
if (isProduction) {
  app.set('trust proxy', 1);
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(rootDir, 'public')));
app.use(
  compression({
    level: 6,
    threshold: 1024,
    filter: (req: express.Request, res: express.Response) => {
      if (req.headers['x-no-compression']) return false;
      return compression.filter(req, res);
    },
  })
);
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per 15 minutes
  })
);
app.use(router);

app.use(
  (
    err: Error & { status?: number },
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    const status = err.status ?? 500;
    res.status(status).json({
      message: err.message,
      ...(req.app.get('env') === 'development' && { error: String(err.stack) }),
    });
  }
);

export default app;
