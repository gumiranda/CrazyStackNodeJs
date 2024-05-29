import { makeDatabaseInstance } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import {
  loadAppointmentByPage,
  LoadAppointmentByPage,
} from "@/slices/appointment/useCases";

export const makeLoadAppointmentByPageFactory = (): LoadAppointmentByPage => {
  const repository = new AppointmentRepository(
    makeDatabaseInstance("mongodb", "appointment")
  );
  return loadAppointmentByPage(repository);
};
