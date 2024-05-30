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
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateRequestByIdFactory = (): IUpdateRequestById => {
  return new UpdateRequestById(
    new RequestRepository(makeDatabaseInstance(whiteLabel.database, "request")),
    new OrderRepository(makeDatabaseInstance("mongodb", "order")),
    new AppointmentRepository(makeDatabaseInstance("mongodb", "appointment")),
    new ServiceRepository(makeDatabaseInstance(whiteLabel.database, "service")),
    new UserRepository(makeDatabaseInstance(whiteLabel.database, "users")),
    new RideRepository(makeDatabaseInstance("mongodb", "ride")),
    new RecurrenceRepository(makeDatabaseInstance("mongodb", "recurrence")),
    new FidelityRepository(makeDatabaseInstance("mongodb", "fidelity")),
    new ClientRepository(makeDatabaseInstance(whiteLabel.database, "client"))
  );
};
