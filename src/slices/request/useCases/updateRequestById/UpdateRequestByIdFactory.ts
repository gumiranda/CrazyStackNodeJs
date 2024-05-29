import { makeDatabaseInstance } from "@/application/infra";
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

export const makeUpdateRequestByIdFactory = (): IUpdateRequestById => {
  return new UpdateRequestById(
    new RequestRepository(makeDatabaseInstance("mongodb", "request")),
    new OrderRepository(makeDatabaseInstance("mongodb", "order")),
    new AppointmentRepository(makeDatabaseInstance("mongodb", "appointment")),
    new ServiceRepository(makeDatabaseInstance("mongodb", "service")),
    new UserRepository(makeDatabaseInstance("mongodb", "users")),
    new RideRepository(makeDatabaseInstance("mongodb", "ride")),
    new RecurrenceRepository(makeDatabaseInstance("mongodb", "recurrence")),
    new FidelityRepository(makeDatabaseInstance("mongodb", "fidelity")),
    new ClientRepository(makeDatabaseInstance("mongodb", "client"))
  );
};
