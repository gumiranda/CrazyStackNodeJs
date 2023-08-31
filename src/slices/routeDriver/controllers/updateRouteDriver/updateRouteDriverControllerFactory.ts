import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateRouteDriverFactory } from "@/slices/routeDriver/useCases";
import { UpdateRouteDriverController } from "@/slices/routeDriver/controllers";

export const makeUpdateRouteDriverController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateRouteDriver",
    new UpdateRouteDriverController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateRouteDriverFactory()
    )
  );
};
