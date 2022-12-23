import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadRequestFactory } from "@/slices/request/useCases";
import { LoadRequestController } from "@/slices/request/controllers";

export const makeLoadRequestController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadRequest",
    new LoadRequestController(
      makeValidationComposite(requiredFields),
      makeLoadRequestFactory()
    )
  );
};
