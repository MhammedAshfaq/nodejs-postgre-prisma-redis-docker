import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index";
import { setupSwagger } from "./swagger";
import { rateLimit } from "./middleware/rateLimit.middleware";
import { getCache, setCache } from "./cache/cache.service";
import client from "prom-client";
import { requestLogger } from "./middleware/requestLogger";
import logger from "./logger/logger";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
});
register.registerMetric(httpRequestCounter);

app.use((req, res, next) => {
  httpRequestCounter.inc();
  next();
});

app.get("/metrics", async (_req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.send(await register.metrics());
});

app.use(express.json());
setupSwagger(app);
app.use(rateLimit(60, 10));
app.use(requestLogger);
app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === "production",
  })
);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);

// Health check
app.get("/", async (_, res) => {
  res.send("Ok");
});
// Redis check
app.get("/redis", async (_, res) => {
  await setCache("test", "hello redis");
  const val = await getCache("test");
  res.send(val);
});

app.use("/api", routes);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
  logger.info(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
});
