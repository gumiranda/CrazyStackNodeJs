import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateMapRouteFactory } from "@/slices/mapRoute/useCases";
import { UpdateMapRouteController } from "@/slices/mapRoute/controllers";

export const makeUpdateMapRouteController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateMapRoute",
    new UpdateMapRouteController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateMapRouteFactory()
    )
  );
};
