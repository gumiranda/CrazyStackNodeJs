import { MongoRepository } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { loadAppointment, LoadAppointment } from "@/slices/appointment/useCases";

export const makeLoadAppointmentFactory = (): LoadAppointment => {
  const repository = new AppointmentRepository(new MongoRepository("appointment"));
  return loadAppointment(repository);
};
