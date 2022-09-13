import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateRequestByIdFactory } from "@/slices/request/useCases";
import { UpdateRequestController } from "@/slices/request/controllers";
import { makeValidateAvailableTimesFactory } from "@/slices/appointment/useCases";

export const makeUpdateRequestController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody = ["status"];
  return makeLogController(
    "updateRequest",
    new UpdateRequestController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateRequestByIdFactory(),
      makeValidateAvailableTimesFactory()
    )
  );
};
