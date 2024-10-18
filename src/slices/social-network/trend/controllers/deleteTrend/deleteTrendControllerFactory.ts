import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteTrendFactory } from "@/slices/trend/useCases";
import { DeleteTrendController } from "@/slices/trend/controllers";

export const makeDeleteTrendController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteTrend",
    new DeleteTrendController(
      makeValidationComposite(requiredFields),
      makeDeleteTrendFactory()
    )
  );
};
