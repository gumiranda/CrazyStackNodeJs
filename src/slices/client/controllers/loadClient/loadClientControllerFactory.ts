import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadClientFactory } from "@/slices/client/useCases";
import { LoadClientController } from "@/slices/client/controllers";

export const makeLoadClientController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadClient",
    new LoadClientController(
      makeValidationComposite(requiredFields),
      makeLoadClientFactory()
    )
  );
};
