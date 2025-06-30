import Redis from "ioredis";
import dotenv from "dotenv";
import logger from "../logger/logger";
dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => logger.info("✅ Redis connected"));
redis.on("error", (err) => logger.error("❌ Redis error:", err));

export default redis;
