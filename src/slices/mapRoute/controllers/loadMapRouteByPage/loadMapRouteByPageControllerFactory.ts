import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadMapRouteByPageFactory } from "@/slices/mapRoute/useCases";
import { LoadMapRouteByPageController } from "@/slices/mapRoute/controllers";

export const makeLoadMapRouteByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadMapRouteByPage",
    new LoadMapRouteByPageController(
      makeValidationComposite(requiredFields),
      makeLoadMapRouteByPageFactory()
    )
  );
};
