import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { loadRecurrence, LoadRecurrence } from "@/slices/recurrence/useCases";

export const makeLoadRecurrenceFactory = (): LoadRecurrence => {
  const repository = new RecurrenceRepository(
    makeDatabaseInstance(whiteLabel.database, "recurrence")
  );
  return loadRecurrence(repository);
};
