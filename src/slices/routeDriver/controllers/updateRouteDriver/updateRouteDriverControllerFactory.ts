import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateRouteDriverFactory } from "@/slices/routeDriver/useCases";
import { UpdateRouteDriverController } from "@/slices/routeDriver/controllers";
import { makeLoadMapRouteFactory } from "@/slices/mapRoute/useCases";

export const makeUpdateRouteDriverController = (): Controller => {
  const requiredFieldsQuery = ["routeId", "lat", "lng"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateRouteDriver",
    new UpdateRouteDriverController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateRouteDriverFactory(),
      makeLoadMapRouteFactory()
    )
  );
};
