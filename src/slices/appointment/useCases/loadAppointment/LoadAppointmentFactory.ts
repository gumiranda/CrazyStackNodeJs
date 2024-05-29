import { makeDatabaseInstance } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { loadAppointment, LoadAppointment } from "@/slices/appointment/useCases";

export const makeLoadAppointmentFactory = (): LoadAppointment => {
  const repository = new AppointmentRepository(
    makeDatabaseInstance("mongodb", "appointment")
  );
  return loadAppointment(repository);
};
