import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateAppointmentFactory } from "@/slices/appointment/useCases";
import { UpdateAppointmentController } from "@/slices/appointment/controllers";

export const makeUpdateAppointmentController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateAppointment",
    new UpdateAppointmentController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateAppointmentFactory()
    )
  );
};
