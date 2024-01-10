import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadRouteDriverFactory } from "@/slices/routeDriver/useCases";
import { LoadRouteDriverController } from "@/slices/routeDriver/controllers";

export const makeLoadRouteDriverController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadRouteDriver",
    new LoadRouteDriverController(
      makeValidationComposite(requiredFields),
      makeLoadRouteDriverFactory()
    )
  );
};
