import { makeDatabaseInstance } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { loadAppointment, LoadAppointment } from "@/slices/appointment/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadAppointmentFactory = (): LoadAppointment => {
  const repository = new AppointmentRepository(
    makeDatabaseInstance(whiteLabel.database, "appointment")
  );
  return loadAppointment(repository);
};
