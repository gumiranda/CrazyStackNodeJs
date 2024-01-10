import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadMapRouteFactory } from "@/slices/mapRoute/useCases";
import { LoadMapRouteController } from "@/slices/mapRoute/controllers";

export const makeLoadMapRouteController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadMapRoute",
    new LoadMapRouteController(
      makeValidationComposite(requiredFields),
      makeLoadMapRouteFactory()
    )
  );
};
