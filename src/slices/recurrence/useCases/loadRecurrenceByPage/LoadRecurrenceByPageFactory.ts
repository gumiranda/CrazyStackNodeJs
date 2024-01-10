import { MongoRepository } from "@/application/infra";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { loadRecurrenceByPage, LoadRecurrenceByPage } from "@/slices/recurrence/useCases";

export const makeLoadRecurrenceByPageFactory = (): LoadRecurrenceByPage => {
  const repository = new RecurrenceRepository(new MongoRepository("recurrence"));
  return loadRecurrenceByPage(repository);
};
