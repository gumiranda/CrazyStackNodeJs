import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteRouteDriverFactory } from "@/slices/routeDriver/useCases";
import { DeleteRouteDriverController } from "@/slices/routeDriver/controllers";

export const makeDeleteRouteDriverController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteRouteDriver",
    new DeleteRouteDriverController(
      makeValidationComposite(requiredFields),
      makeDeleteRouteDriverFactory()
    )
  );
};
