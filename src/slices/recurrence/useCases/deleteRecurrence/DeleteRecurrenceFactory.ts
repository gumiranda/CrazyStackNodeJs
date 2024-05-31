import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { deleteRecurrence, DeleteRecurrence } from "@/slices/recurrence/useCases";

export const makeDeleteRecurrenceFactory = (): DeleteRecurrence => {
  const repository = new RecurrenceRepository(
    makeDatabaseInstance(whiteLabel.database, "recurrence")
  );
  return deleteRecurrence(repository);
};
