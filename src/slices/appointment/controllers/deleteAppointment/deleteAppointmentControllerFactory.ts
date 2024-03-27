import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteAppointmentFactory } from "@/slices/appointment/useCases";
import { DeleteAppointmentController } from "@/slices/appointment/controllers";
import {
  makeUpdateRequestByIdFactory,
  makeUpdateRequestFactory,
} from "@/slices/request/useCases";

export const makeDeleteAppointmentController = (): Controller => {
  const requiredFields = ["requestId"];
  return makeLogController(
    "deleteAppointment",
    new DeleteAppointmentController(
      makeValidationComposite(requiredFields),
      makeDeleteAppointmentFactory(),
      makeUpdateRequestByIdFactory(),
      makeUpdateRequestFactory()
    )
  );
};
