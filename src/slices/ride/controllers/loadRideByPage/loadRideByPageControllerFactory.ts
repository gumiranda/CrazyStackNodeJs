import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadRideByPageFactory } from "@/slices/ride/useCases";
import { LoadRideByPageController } from "@/slices/ride/controllers";

export const makeLoadRideByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadRideByPage",
    new LoadRideByPageController(
      makeValidationComposite(requiredFields),
      makeLoadRideByPageFactory()
    )
  );
};
