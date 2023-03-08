import { authLogged } from "@/application/infra/middlewares";
import {
  addUserAdapter,
  loadUserAdapter,
  deleteUserAdapter,
  updateUserAdapter,
  loadUserByPageAdapter,
  loadUserByGeoNearAdapter,
} from "./userAdapter";
import {
  addUserPostSchema,
  loadUserGetSchema,
  deleteUserSchema,
  updateUserSchema,
  loadUserByPageGetSchema,
  loadUserByGeoNearSchema,
} from "./userSchema";
import clientRedis from "./redis";

async function getRedis(key: string) {
  try {
    return await clientRedis.get(key);
  } catch (error) {
    console.error("Error getting Redis value:", error);
    return null;
  }
}

async function setRedis(key: string, value: string) {
  try {
    await clientRedis.del(key);
    await clientRedis.set(key, value);
  } catch (error) {
    console.error("Error setting Redis value:", error);
  }
}
const parseJson = (json: any): any => {
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
async function user(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());

  fastify.addHook("preHandler", async (req: any, reply: any) => {
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
        fastify.log.error(`Failed to read to cache: ${err}`);
      }
    }
  });
  fastify.addHook("onSend", async (req: any, reply: any, payload: any) => {
    if (!payload) {
      return;
    }
    if (req.method === "GET" && parseJson(payload) && !parseJson(payload)?.cache) {
      const cacheKey = `user:${req.url}`;
      setRedis(cacheKey, JSON.stringify(parseJson(payload)));
    }
    return payload;
  });
  fastify.post("/user/add", addUserPostSchema, addUserAdapter());
  fastify.get("/user/load", loadUserGetSchema, loadUserAdapter());
  fastify.get("/user/loadByPage", loadUserByPageGetSchema, loadUserByPageAdapter());
  fastify.get("/user/loadByGeoNear", loadUserByGeoNearSchema, loadUserByGeoNearAdapter());
  fastify.delete("/user/delete", deleteUserSchema, deleteUserAdapter());
  fastify.patch("/user/update", updateUserSchema, updateUserAdapter());
}
export { user };
