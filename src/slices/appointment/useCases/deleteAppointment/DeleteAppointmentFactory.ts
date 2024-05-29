import { makeDatabaseInstance } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { deleteAppointment, DeleteAppointment } from "@/slices/appointment/useCases";

export const makeDeleteAppointmentFactory = (): DeleteAppointment => {
  const repository = new AppointmentRepository(
    makeDatabaseInstance("mongodb", "appointment")
  );
  return deleteAppointment(repository);
};
