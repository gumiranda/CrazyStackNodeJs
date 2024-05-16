import { MongoRepository } from "@/application/infra";
import { loadAvailableTimes, LoadAvailableTimes } from "@/slices/appointment/useCases";
import { OwnerRepository } from "@/slices/owner/repositories";
import { ServiceRepository } from "@/slices/service/repositories";
import { UserRepository } from "@/slices/user/repositories";
import { AppointmentAggregateRepository } from "../../repositories/aggregates/mongodb/appointmentAggregateRepository";
export const makeLoadAvailableTimesFactory = (): LoadAvailableTimes => {
  return loadAvailableTimes(
    new AppointmentAggregateRepository(new MongoRepository("appointment")),
    new ServiceRepository(new MongoRepository("service")),
    new UserRepository(new MongoRepository("user")),
    new OwnerRepository(new MongoRepository("owner"))
  );
};
