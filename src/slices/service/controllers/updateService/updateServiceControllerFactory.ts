import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateServiceFactory } from "@/slices/service/useCases";
import { UpdateServiceController } from "@/slices/service/controllers";

export const makeUpdateServiceController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateService",
    new UpdateServiceController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateServiceFactory()
    )
  );
};
