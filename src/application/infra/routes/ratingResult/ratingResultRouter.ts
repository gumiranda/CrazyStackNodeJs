import { authLogged } from "@/application/infra/middlewares";
import {
  addRatingResultAdapter,
  loadRatingResultAdapter,
  deleteRatingResultAdapter,
  updateRatingResultAdapter,
  loadRatingResultByPageAdapter,
  loadAverageRatingResultAdapter,
} from "./ratingResultAdapter";
import {
  addRatingResultPostSchema,
  loadRatingResultGetSchema,
  deleteRatingResultSchema,
  updateRatingResultSchema,
  loadRatingResultByPageGetSchema,
} from "./ratingResultSchema";

async function ratingResult(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/ratingResult/add", addRatingResultPostSchema, addRatingResultAdapter());
  fastify.get("/ratingResult/load", loadRatingResultGetSchema, loadRatingResultAdapter());
  fastify.get(
    "/ratingResult/loadByPage",
    loadRatingResultByPageGetSchema,
    loadRatingResultByPageAdapter()
  );
  fastify.get("/ratingResult/loadAverage", loadAverageRatingResultAdapter());
  fastify.delete(
    "/ratingResult/delete",
    deleteRatingResultSchema,
    deleteRatingResultAdapter()
  );
  fastify.patch(
    "/ratingResult/update",
    updateRatingResultSchema,
    updateRatingResultAdapter()
  );
}
export { ratingResult };
