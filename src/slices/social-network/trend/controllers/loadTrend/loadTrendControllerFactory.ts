import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadTrendFactory } from "@/slices/trend/useCases";
import { LoadTrendController } from "@/slices/trend/controllers";

export const makeLoadTrendController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadTrend",
    new LoadTrendController(
      makeValidationComposite(requiredFields),
      makeLoadTrendFactory()
    )
  );
};
