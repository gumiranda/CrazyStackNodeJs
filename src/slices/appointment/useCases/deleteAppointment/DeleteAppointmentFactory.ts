import { makeDatabaseInstance } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { deleteAppointment, DeleteAppointment } from "@/slices/appointment/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteAppointmentFactory = (): DeleteAppointment => {
  const repository = new AppointmentRepository(
    makeDatabaseInstance(whiteLabel.database, "appointment")
  );
  return deleteAppointment(repository);
};
