import { DeleteRecurrenceRepository } from "@/slices/recurrence/repositories";
import { RecurrenceData } from "@/slices/recurrence/entities";
import { Query } from "@/application/types";

export type DeleteRecurrence = (query: Query) => Promise<RecurrenceData | null>;
export type DeleteRecurrenceSignature = (
    deleteRecurrence: DeleteRecurrenceRepository
) => DeleteRecurrence;
export const deleteRecurrence: DeleteRecurrenceSignature =
    (deleteRecurrenceRepository: DeleteRecurrenceRepository) => (query: Query) => {
        return deleteRecurrenceRepository.deleteRecurrence(query);
    };
