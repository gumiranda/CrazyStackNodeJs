import { MongoRepository } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { ClientRepository } from "@/slices/client/repositories";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { OrderRepository } from "@/slices/order/repositories";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { RequestRepository } from "@/slices/request/repositories";
import { RideRepository } from "@/slices/ride/repositories";
import { ServiceRepository } from "@/slices/service/repositories";
import { UserRepository } from "@/slices/user/repositories";
import { IUpdateRequestById } from "./contracts";
import { UpdateRequestById } from "./UpdateRequestById";
import { PostgresRepository } from "@/application/infra/database/postgres/repository/pg-repository";

export const makeUpdateRequestByIdFactory = (): IUpdateRequestById => {
  return new UpdateRequestById(
    new RequestRepository(new MongoRepository("request")),
    new OrderRepository(new MongoRepository("order")),
    new AppointmentRepository(new MongoRepository("appointment")),
    new ServiceRepository(new MongoRepository("service")),
    new UserRepository(new PostgresRepository("user")),
    new RideRepository(new MongoRepository("ride")),
    new RecurrenceRepository(new MongoRepository("recurrence")),
    new FidelityRepository(new MongoRepository("fidelity")),
    new ClientRepository(new MongoRepository("client"))
  );
};
