import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { deleteAppointment, DeleteAppointment } from "@/slices/appointment/useCases";

export const makeDeleteAppointmentFactory = (): DeleteAppointment => {
  const repository = new AppointmentRepository(
    makeDatabaseInstance(whiteLabel.database, "appointment")
  );
  return deleteAppointment(repository);
};
