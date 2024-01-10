import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteRecurrenceFactory } from "@/slices/recurrence/useCases";
import { DeleteRecurrenceController } from "@/slices/recurrence/controllers";

export const makeDeleteRecurrenceController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteRecurrence",
    new DeleteRecurrenceController(
      makeValidationComposite(requiredFields),
      makeDeleteRecurrenceFactory()
    )
  );
};
