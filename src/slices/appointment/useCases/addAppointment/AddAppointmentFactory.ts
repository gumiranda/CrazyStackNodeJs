import { makeDatabaseInstance } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { addAppointment, AddAppointment } from "@/slices/appointment/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeAddAppointmentFactory = (): AddAppointment => {
  const repository = new AppointmentRepository(
    makeDatabaseInstance(whiteLabel.database, "appointment")
  );
  return addAppointment(repository);
};
