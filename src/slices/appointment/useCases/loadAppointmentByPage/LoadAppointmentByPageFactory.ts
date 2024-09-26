import { makeDatabaseInstance } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import {
  loadAppointmentByPage,
  LoadAppointmentByPage,
} from "@/slices/appointment/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadAppointmentByPageFactory = (): LoadAppointmentByPage => {
  const repository = new AppointmentRepository(
    makeDatabaseInstance(whiteLabel.database, "appointment")
  );
  return loadAppointmentByPage(repository);
};
