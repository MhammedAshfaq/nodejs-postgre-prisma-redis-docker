import redisClient from "./redisClient";

export const setCache = async (key: string, value: any, ttl = 60) => {
  return await redisClient.setex(key, ttl, JSON.stringify(value));
};

export const getCache = async (key: string): Promise<any> => {
  // This `T` is typescript generic
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

export const deleteCache = async (key: string) => {
  await redisClient.del(key);
};
