import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { addAppointment, AddAppointment } from "@/slices/appointment/useCases";

export const makeAddAppointmentFactory = (): AddAppointment => {
  const repository = new AppointmentRepository(
    makeDatabaseInstance(whiteLabel.database, "appointment")
  );
  return addAppointment(repository);
};
