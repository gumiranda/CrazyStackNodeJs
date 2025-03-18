import { authLogged } from "@/application/infra/middlewares";
import {
  addTrendAdapter,
  loadTrendAdapter,
  deleteTrendAdapter,
  updateTrendAdapter,
  loadTrendByPageAdapter,
} from "./trendAdapter";
import {
  addTrendPostSchema,
  loadTrendGetSchema,
  deleteTrendSchema,
  updateTrendSchema,
  loadTrendByPageGetSchema,
} from "./trendSchema";

async function trend(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/trend/add", addTrendPostSchema, addTrendAdapter());
  fastify.get("/trend/load", loadTrendGetSchema, loadTrendAdapter());
  fastify.get(
    "/trend/loadByPage",
    loadTrendByPageGetSchema,
    loadTrendByPageAdapter()
  );
  fastify.delete("/trend/delete", deleteTrendSchema, deleteTrendAdapter());
  fastify.patch("/trend/update", updateTrendSchema, updateTrendAdapter());
}
export { trend };
