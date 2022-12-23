import { MongoRepository } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { deleteAppointment, DeleteAppointment } from "@/slices/appointment/useCases";

export const makeDeleteAppointmentFactory = (): DeleteAppointment => {
  const repository = new AppointmentRepository(new MongoRepository("appointment"));
  return deleteAppointment(repository);
};
