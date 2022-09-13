import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadFidelityByPageFactory } from "@/slices/fidelity/useCases";
import { LoadFidelityByPageController } from "@/slices/fidelity/controllers";

export const makeLoadFidelityByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadFidelityByPage",
    new LoadFidelityByPageController(
      makeValidationComposite(requiredFields),
      makeLoadFidelityByPageFactory()
    )
  );
};
