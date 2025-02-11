import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadTrendByPageFactory } from "@/slices/social-network/trend/useCases";
import { LoadTrendByPageController } from "@/slices/social-network/trend/controllers";

export const makeLoadTrendByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadTrendByPage",
    new LoadTrendByPageController(
      makeValidationComposite(requiredFields),
      makeLoadTrendByPageFactory()
    )
  );
};
