import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddRouteDriverFactory } from "@/slices/routeDriver/useCases";
import { AddRouteDriverController } from "@/slices/routeDriver/controllers";

export const makeAddRouteDriverController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addRouteDriver",
    new AddRouteDriverController(
      makeValidationComposite(requiredFields),
      makeAddRouteDriverFactory()
    )
  );
};
