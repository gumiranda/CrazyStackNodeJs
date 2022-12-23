import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadServiceByPageFactory } from "@/slices/service/useCases";
import { LoadServiceByPageController } from "@/slices/service/controllers";

export const makeLoadServiceByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadServiceByPage",
    new LoadServiceByPageController(
      makeValidationComposite(requiredFields),
      makeLoadServiceByPageFactory()
    )
  );
};
