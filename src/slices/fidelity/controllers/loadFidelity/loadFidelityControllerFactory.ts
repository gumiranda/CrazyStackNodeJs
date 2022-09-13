import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadFidelityFactory } from "@/slices/fidelity/useCases";
import { LoadFidelityController } from "@/slices/fidelity/controllers";

export const makeLoadFidelityController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadFidelity",
    new LoadFidelityController(
      makeValidationComposite(requiredFields),
      makeLoadFidelityFactory()
    )
  );
};
