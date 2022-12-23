import { authLogged } from "@/application/infra/middlewares";
import {
  addRecurrenceAdapter,
  loadRecurrenceAdapter,
  deleteRecurrenceAdapter,
  updateRecurrenceAdapter,
  loadRecurrenceByPageAdapter,
} from "./recurrenceAdapter";
import {
  addRecurrencePostSchema,
  loadRecurrenceGetSchema,
  deleteRecurrenceSchema,
  updateRecurrenceSchema,
  loadRecurrenceByPageGetSchema,
} from "./recurrenceSchema";

async function recurrence(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/recurrence/add", addRecurrencePostSchema, addRecurrenceAdapter());
  fastify.get("/recurrence/load", loadRecurrenceGetSchema, loadRecurrenceAdapter());
  fastify.get(
    "/recurrence/loadByPage",
    loadRecurrenceByPageGetSchema,
    loadRecurrenceByPageAdapter()
  );
  fastify.delete("/recurrence/delete", deleteRecurrenceSchema, deleteRecurrenceAdapter());
  fastify.patch("/recurrence/update", updateRecurrenceSchema, updateRecurrenceAdapter());
}
export { recurrence };
