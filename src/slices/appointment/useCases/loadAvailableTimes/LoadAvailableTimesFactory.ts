import { makeDatabaseInstance, MongoRepository } from "@/application/infra";
import { loadAvailableTimes, LoadAvailableTimes } from "@/slices/appointment/useCases";
import { OwnerRepository } from "@/slices/owner/repositories";
import { ServiceRepository } from "@/slices/service/repositories";
import { UserRepository } from "@/slices/user/repositories";
import { AppointmentAggregateRepository } from "../../repositories/aggregates/mongodb/appointmentAggregateRepository";
export const makeLoadAvailableTimesFactory = (): LoadAvailableTimes => {
  return loadAvailableTimes(
    new AppointmentAggregateRepository(new MongoRepository("appointment")),
    new ServiceRepository(makeDatabaseInstance("mongodb", "service")),
    new UserRepository(makeDatabaseInstance("mongodb", "users")),
    new OwnerRepository(makeDatabaseInstance("mongodb", "owner"))
  );
};
