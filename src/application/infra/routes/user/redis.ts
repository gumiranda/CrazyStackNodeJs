import { Redis } from "ioredis";
import { env } from "@/application/infra";
const clientRedis = new Redis(Number(env.redisPort), env.redisUrl, {
  password: env.redisPassword,
  maxRetriesPerRequest: 9999,
  tls: {},
});
export default clientRedis;
