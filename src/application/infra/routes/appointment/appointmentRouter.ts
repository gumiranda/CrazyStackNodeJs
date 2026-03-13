import { Elysia } from "elysia";
import { authLogged } from "@/application/infra/middlewares";
import {
  addAppointmentAdapter,
  loadAppointmentAdapter,
  deleteAppointmentAdapter,
  updateAppointmentAdapter,
  loadAppointmentByPageAdapter,
  loadAvailableTimesAdapter,
  loadInvoiceAdapter,
} from "./appointmentAdapter";

const appointment = new Elysia()
  .state("userId", null as string | null)
  .state("userLogged", null as any)
  .state("daysToNextPayment", null as any)
  .guard({ beforeHandle: [authLogged()] }, (app) =>
    app
      .post("/appointment/add", addAppointmentAdapter())
      .get("/appointment/load", loadAppointmentAdapter())
      .get("/appointment/loadInvoice", loadInvoiceAdapter())
      .get("/appointment/loadAvailableTimes", loadAvailableTimesAdapter())
      .get("/appointment/loadByPage", loadAppointmentByPageAdapter())
      .delete("/appointment/delete", deleteAppointmentAdapter())
      .patch("/appointment/update", updateAppointmentAdapter())
  );

export { appointment };
