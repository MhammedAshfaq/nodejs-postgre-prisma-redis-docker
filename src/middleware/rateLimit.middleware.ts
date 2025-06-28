import { Request, Response, NextFunction } from 'express';
import redisClient from '../cache/redisClient';

export const rateLimit = (windowSec: number = 60, maxReq = 10) => {
  return async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    const ip = req.ip;
    const key = `rate:${ip}`;

    const reqCount = await redisClient.incr(key);
    if (reqCount === 1) {
      await redisClient.expire(key, windowSec);
    }

    if (reqCount > maxReq) {
      return res.status(429).json({ message: 'Too many requests. Try again later.' });
    }

    next();
  };
};
