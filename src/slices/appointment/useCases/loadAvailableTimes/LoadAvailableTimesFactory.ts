import { MongoRepository } from "@/application/infra";
import { loadAvailableTimes, LoadAvailableTimes } from "@/slices/appointment/useCases";
import { OwnerRepository } from "@/slices/owner/repositories";
import { ServiceRepository } from "@/slices/service/repositories";
import { UserRepository } from "@/slices/user/repositories";
import { PostgresRepository } from "@/application/infra/database/postgres/repository/pg-repository";
import { AppointmentAggregateRepository } from "../../repositories/aggregates/mongodb/appointmentAggregateRepository";
export const makeLoadAvailableTimesFactory = (): LoadAvailableTimes => {
  return loadAvailableTimes(
    new AppointmentAggregateRepository(new MongoRepository("appointment")),
    new ServiceRepository(new MongoRepository("service")),
    new UserRepository(new PostgresRepository("user")),
    new OwnerRepository(new MongoRepository("owner"))
  );
};
