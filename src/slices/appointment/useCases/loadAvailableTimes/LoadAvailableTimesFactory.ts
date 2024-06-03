import {
  makeDatabaseInstance,
  MongoRepository,
  PostgresRepository,
} from "@/application/infra";
import { loadAvailableTimes, LoadAvailableTimes } from "@/slices/appointment/useCases";
import { OwnerRepository } from "@/slices/owner/repositories";
import { ServiceRepository } from "@/slices/service/repositories";
import { UserRepository } from "@/slices/user/repositories";
import { AppointmentAggregateRepository } from "../../repositories/aggregates/mongodb/appointmentAggregateRepository";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { AppointmentAggregatePgRepository } from "../../repositories/aggregates/postgres/appointmentAggregatePgRepository";

export const makeLoadAvailableTimesFactory = (): LoadAvailableTimes => {
  return loadAvailableTimes(
    makeAggregateRepository(),
    new ServiceRepository(makeDatabaseInstance(whiteLabel.database, "service")),
    new UserRepository(makeDatabaseInstance(whiteLabel.database, "users")),
    new OwnerRepository(makeDatabaseInstance(whiteLabel.database, "owner"))
  );
};
export const makeAggregateRepository = () => {
  if (whiteLabel.database === "mongodb") {
    return new AppointmentAggregateRepository(new MongoRepository("appointment"));
  }
  return new AppointmentAggregatePgRepository(new PostgresRepository("appointment"));
};
