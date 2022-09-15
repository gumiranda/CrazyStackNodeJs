import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadOwnerFactory } from "@/slices/owner/useCases";
import { LoadOwnerController } from "@/slices/owner/controllers";

export const makeLoadOwnerController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadOwner",
    new LoadOwnerController(
      makeValidationComposite(requiredFields),
      makeLoadOwnerFactory()
    )
  );
};
