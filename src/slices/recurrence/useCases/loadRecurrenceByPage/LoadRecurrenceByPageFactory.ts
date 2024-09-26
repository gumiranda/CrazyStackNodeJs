import { makeDatabaseInstance } from "@/application/infra";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { loadRecurrenceByPage, LoadRecurrenceByPage } from "@/slices/recurrence/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadRecurrenceByPageFactory = (): LoadRecurrenceByPage => {
  const repository = new RecurrenceRepository(
    makeDatabaseInstance(whiteLabel.database, "recurrence")
  );
  return loadRecurrenceByPage(repository);
};
