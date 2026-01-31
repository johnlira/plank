import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import pino from "pino";
import pinoHttp from "pino-http";
import { env } from "./config/env";
import apiRouter from "./routes";
import { errorHandler } from "./err/error-handler";

const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});

const app = express();
const PORT = env.PORT;

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use(pinoHttp({ logger }));

app.use("/api", apiRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
