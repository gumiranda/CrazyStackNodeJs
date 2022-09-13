import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadServiceFactory } from "@/slices/service/useCases";
import { LoadServiceController } from "@/slices/service/controllers";

export const makeLoadServiceController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadService",
    new LoadServiceController(
      makeValidationComposite(requiredFields),
      makeLoadServiceFactory()
    )
  );
};
