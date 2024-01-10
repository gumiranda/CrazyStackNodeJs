import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteMapRouteFactory } from "@/slices/mapRoute/useCases";
import { DeleteMapRouteController } from "@/slices/mapRoute/controllers";

export const makeDeleteMapRouteController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteMapRoute",
    new DeleteMapRouteController(
      makeValidationComposite(requiredFields),
      makeDeleteMapRouteFactory()
    )
  );
};
