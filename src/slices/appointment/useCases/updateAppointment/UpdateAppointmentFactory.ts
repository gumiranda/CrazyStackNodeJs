import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { updateAppointment, UpdateAppointment } from "@/slices/appointment/useCases";

export const makeUpdateAppointmentFactory = (): UpdateAppointment => {
  const repository = new AppointmentRepository(
    makeDatabaseInstance(whiteLabel.database, "appointment")
  );
  return updateAppointment(repository);
};
