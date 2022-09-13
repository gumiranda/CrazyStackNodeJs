import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddRequestFactory } from "@/slices/request/useCases";
import { AddRequestController } from "@/slices/request/controllers";

export const makeAddRequestController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addRequest",
    new AddRequestController(
      makeValidationComposite(requiredFields),
      makeAddRequestFactory()
    )
  );
};
