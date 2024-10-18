import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateTrendFactory } from "@/slices/trend/useCases";
import { UpdateTrendController } from "@/slices/trend/controllers";

export const makeUpdateTrendController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateTrend",
    new UpdateTrendController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateTrendFactory()
    )
  );
};
