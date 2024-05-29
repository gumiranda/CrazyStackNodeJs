import { makeDatabaseInstance } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { updateAppointment, UpdateAppointment } from "@/slices/appointment/useCases";

export const makeUpdateAppointmentFactory = (): UpdateAppointment => {
  const repository = new AppointmentRepository(
    makeDatabaseInstance("mongodb", "appointment")
  );
  return updateAppointment(repository);
};
