import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadRouteDriverByPageFactory } from "@/slices/routeDriver/useCases";
import { LoadRouteDriverByPageController } from "@/slices/routeDriver/controllers";

export const makeLoadRouteDriverByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadRouteDriverByPage",
    new LoadRouteDriverByPageController(
      makeValidationComposite(requiredFields),
      makeLoadRouteDriverByPageFactory()
    )
  );
};
