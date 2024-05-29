import { makeDatabaseInstance } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { addAppointment, AddAppointment } from "@/slices/appointment/useCases";

export const makeAddAppointmentFactory = (): AddAppointment => {
  const repository = new AppointmentRepository(
    makeDatabaseInstance("mongodb", "appointment")
  );
  return addAppointment(repository);
};
