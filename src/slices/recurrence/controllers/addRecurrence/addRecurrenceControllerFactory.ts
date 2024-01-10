import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddRecurrenceFactory } from "@/slices/recurrence/useCases";
import { AddRecurrenceController } from "@/slices/recurrence/controllers";

export const makeAddRecurrenceController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addRecurrence",
    new AddRecurrenceController(
      makeValidationComposite(requiredFields),
      makeAddRecurrenceFactory()
    )
  );
};
