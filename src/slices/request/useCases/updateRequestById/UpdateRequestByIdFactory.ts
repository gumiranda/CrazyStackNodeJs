import { makeDatabaseInstance } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { RequestRepository } from "@/slices/request/repositories";
import { IUpdateRequestById } from "./contracts";
import { UpdateRequestById } from "./UpdateRequestById";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateRequestByIdFactory = (): IUpdateRequestById => {
  return new UpdateRequestById(
    new RequestRepository(makeDatabaseInstance(whiteLabel.database, "request")),
    new AppointmentRepository(makeDatabaseInstance(whiteLabel.database, "appointment"))
  );
};
