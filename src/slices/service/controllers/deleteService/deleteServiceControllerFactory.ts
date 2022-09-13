import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteServiceFactory } from "@/slices/service/useCases";
import { DeleteServiceController } from "@/slices/service/controllers";

export const makeDeleteServiceController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteService",
    new DeleteServiceController(
      makeValidationComposite(requiredFields),
      makeDeleteServiceFactory()
    )
  );
};
