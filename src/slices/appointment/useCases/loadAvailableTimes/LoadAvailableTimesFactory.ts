import { loadAvailableTimes, LoadAvailableTimes } from "@/slices/appointment/useCases";
import { OwnerRepository } from "@/slices/owner/repositories";
import { ServiceRepository } from "@/slices/service/repositories";
import { UserRepository } from "@/slices/user/repositories";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { AppointmentAggregatePgRepository } from "../../repositories/aggregates/postgres/appointmentAggregatePgRepository";
import { PostgresRepository } from "@/application/infra/database/postgres/repository/pg-repository";
export const makeLoadAvailableTimesFactory = (): LoadAvailableTimes => {
  return loadAvailableTimes(
    new AppointmentAggregatePgRepository(new PostgresRepository("appointment")),
    new ServiceRepository(makeDatabaseInstance(whiteLabel.database, "service")),
    new UserRepository(makeDatabaseInstance(whiteLabel.database, "users")),
    new OwnerRepository(makeDatabaseInstance(whiteLabel.database, "owner"))
  );
};
