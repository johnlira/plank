import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { env } from './config/env';
import apiRouter from './routes';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

const app = express();
const PORT = env.PORT;

app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.use('/api', apiRouter);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
