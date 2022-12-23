import { authLogged } from "@/application/infra/middlewares";
import {
  addAppointmentAdapter,
  loadAppointmentAdapter,
  deleteAppointmentAdapter,
  updateAppointmentAdapter,
  loadAppointmentByPageAdapter,
  loadAvailableTimesAdapter,
} from "./appointmentAdapter";
import {
  addAppointmentPostSchema,
  loadAppointmentGetSchema,
  deleteAppointmentSchema,
  updateAppointmentSchema,
  loadAppointmentByPageGetSchema,
  loadAvailableTimesSchema,
} from "./appointmentSchema";

async function appointment(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/appointment/add", addAppointmentPostSchema, addAppointmentAdapter());
  fastify.get("/appointment/load", loadAppointmentGetSchema, loadAppointmentAdapter());
  fastify.get(
    "/appointment/loadAvailableTimes",
    loadAvailableTimesSchema,
    loadAvailableTimesAdapter()
  );
  fastify.get(
    "/appointment/loadByPage",
    loadAppointmentByPageGetSchema,
    loadAppointmentByPageAdapter()
  );
  fastify.delete(
    "/appointment/delete",
    deleteAppointmentSchema,
    deleteAppointmentAdapter()
  );
  fastify.patch(
    "/appointment/update",
    updateAppointmentSchema,
    updateAppointmentAdapter()
  );
}
export { appointment };
