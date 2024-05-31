import { makeDatabaseInstance } from "@/application/infra";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { addRecurrence, AddRecurrence } from "@/slices/recurrence/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeAddRecurrenceFactory = (): AddRecurrence => {
  const repository = new RecurrenceRepository(
    makeDatabaseInstance(whiteLabel.database, "recurrence")
  );
  return addRecurrence(repository);
};
