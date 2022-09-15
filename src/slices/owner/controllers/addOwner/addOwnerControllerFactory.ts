import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddOwnerFactory } from "@/slices/owner/useCases";
import { AddOwnerController } from "@/slices/owner/controllers";

export const makeAddOwnerController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addOwner",
    new AddOwnerController(
      makeValidationComposite(requiredFields),
      makeAddOwnerFactory()
    )
  );
};
