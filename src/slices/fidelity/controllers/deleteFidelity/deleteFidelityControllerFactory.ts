import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteFidelityFactory } from "@/slices/fidelity/useCases";
import { DeleteFidelityController } from "@/slices/fidelity/controllers";

export const makeDeleteFidelityController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteFidelity",
    new DeleteFidelityController(
      makeValidationComposite(requiredFields),
      makeDeleteFidelityFactory()
    )
  );
};
