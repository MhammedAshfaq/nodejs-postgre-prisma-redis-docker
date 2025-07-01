


// src/background/queue/bullmq.connection.ts
import Redis from 'ioredis';
import dotenv from 'dotenv'
dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

export default redis; // 👈 export the IORedis instance


/* 
Let me know if you also want to:

Add delayed jobs

Add job retry delay/backoff

Setup a UI dashboard for job monitoring (like Bull Board or Arena)

*/