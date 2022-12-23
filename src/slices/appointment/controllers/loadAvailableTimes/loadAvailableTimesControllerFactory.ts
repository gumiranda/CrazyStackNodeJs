import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadAvailableTimesFactory } from "@/slices/appointment/useCases";
import { LoadAvailableTimesController } from "@/slices/appointment/controllers";

export const makeLoadAvailableTimesController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadAvailableTimes",
    new LoadAvailableTimesController(
      makeValidationComposite(requiredFields),
      makeLoadAvailableTimesFactory()
    )
  );
};
