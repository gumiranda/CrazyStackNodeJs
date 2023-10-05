import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadCarByPageFactory } from "@/slices/car/useCases";
import { LoadCarByPageController } from "@/slices/car/controllers";

export const makeLoadCarByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadCarByPage",
    new LoadCarByPageController(
      makeValidationComposite(requiredFields),
      makeLoadCarByPageFactory()
    )
  );
};
