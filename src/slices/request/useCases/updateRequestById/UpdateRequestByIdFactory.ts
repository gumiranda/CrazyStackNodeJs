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
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
export const makeUpdateRequestByIdFactory = (): IUpdateRequestById => {
  return new UpdateRequestById(
    new RequestRepository(makeDatabaseInstance(whiteLabel.database, "request")),
    new OrderRepository(new MongoRepository("order")),
    new AppointmentRepository(new MongoRepository("appointment")),
    new ServiceRepository(makeDatabaseInstance(whiteLabel.database, "service")),
    new UserRepository(makeDatabaseInstance(whiteLabel.database, "users")),
    new RideRepository(new MongoRepository("ride")),
    new RecurrenceRepository(new MongoRepository("recurrence")),
    new FidelityRepository(new MongoRepository("fidelity")),
    new ClientRepository(makeDatabaseInstance(whiteLabel.database, "client"))
  );
};
