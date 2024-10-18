import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddTrendFactory } from "@/slices/trend/useCases";
import { AddTrendController } from "@/slices/trend/controllers";

export const makeAddTrendController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addTrend",
    new AddTrendController(
      makeValidationComposite(requiredFields),
      makeAddTrendFactory()
    )
  );
};
