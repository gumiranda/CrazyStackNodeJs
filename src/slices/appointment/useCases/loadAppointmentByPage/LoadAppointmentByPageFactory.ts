import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import {
  loadAppointmentByPage,
  LoadAppointmentByPage,
} from "@/slices/appointment/useCases";

export const makeLoadAppointmentByPageFactory = (): LoadAppointmentByPage => {
  const repository = new AppointmentRepository(
    makeDatabaseInstance(whiteLabel.database, "appointment")
  );
  return loadAppointmentByPage(repository);
};
