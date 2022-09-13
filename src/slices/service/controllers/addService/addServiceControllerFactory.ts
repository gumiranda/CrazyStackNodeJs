import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddServiceFactory } from "@/slices/service/useCases";
import { AddServiceController } from "@/slices/service/controllers";

export const makeAddServiceController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addService",
    new AddServiceController(
      makeValidationComposite(requiredFields),
      makeAddServiceFactory()
    )
  );
};
