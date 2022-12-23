import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddFidelityFactory } from "@/slices/fidelity/useCases";
import { AddFidelityController } from "@/slices/fidelity/controllers";

export const makeAddFidelityController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addFidelity",
    new AddFidelityController(
      makeValidationComposite(requiredFields),
      makeAddFidelityFactory()
    )
  );
};
