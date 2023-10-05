import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddMapRouteFactory } from "@/slices/mapRoute/useCases";
import { AddMapRouteController } from "@/slices/mapRoute/controllers";

export const makeAddMapRouteController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addMapRoute",
    new AddMapRouteController(
      makeValidationComposite(requiredFields),
      makeAddMapRouteFactory()
    )
  );
};
