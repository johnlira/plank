import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.get('/', (req, res) => {
  res.json({ message: 'Plank Server Running' });
});

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
