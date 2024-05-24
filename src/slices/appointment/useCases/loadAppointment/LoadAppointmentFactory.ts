import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { loadAppointment, LoadAppointment } from "@/slices/appointment/useCases";

export const makeLoadAppointmentFactory = (): LoadAppointment => {
  const repository = new AppointmentRepository(
    makeDatabaseInstance(whiteLabel.database, "appointment")
  );
  return loadAppointment(repository);
};
