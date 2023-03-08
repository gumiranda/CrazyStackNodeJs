import { Redis } from "ioredis";
import { env } from "@/application/infra";
export const clientRedis = new Redis(Number(env.redisPort), env.redisUrl, {
  password: env.redisPassword,
  maxRetriesPerRequest: 9999,
  tls: {},
});

export const getRedis = async (key: string) => {
  try {
    return await clientRedis.get(key);
  } catch (error) {
    console.error("Error getting Redis value:", error);
    return null;
  }
};

export const setRedis = async (key: string, value: string) => {
  try {
    await clientRedis.del(key);
    await clientRedis.set(key, value);
  } catch (error) {
    console.error("Error setting Redis value:", error);
  }
};
export const parseJson = (json: any): any => {
  try {
    const parsedJson = JSON.parse(json);
    if (typeof parsedJson === "object" && parsedJson !== null) {
      return parsedJson;
    } else {
      return JSON.parse(parsedJson);
    }
  } catch (e) {
    return false;
  }
};

export const onSendRedis = () => async (req: any, reply: any, payload: any) => {
  if (!payload) {
    return;
  }
  if (req.method === "GET" && parseJson(payload) && !parseJson(payload)?.cache) {
    const cacheKey = `user:${req.url}`;
    setRedis(cacheKey, JSON.stringify(parseJson(payload)));
  }
  return payload;
};
export const preHandlerRedis = () => async (req: any, reply: any) => {
  if (req.method === "GET") {
    const cacheKey = `user:${req.url}`;
    try {
      const cachedData = await getRedis(cacheKey);
      if (cachedData && parseJson(cachedData)) {
        const parsedJson = parseJson(cachedData);
        reply.send(Object.assign(parsedJson, { cache: true }));
        return;
      }
    } catch (err) {
      console.error(`Failed to read to cache: ${err}`);
    }
  }
};
