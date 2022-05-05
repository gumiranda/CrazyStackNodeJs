import { AddRecurrenceRepository } from "@/slices/recurrence/repositories";
import { RecurrenceEntity, RecurrenceData } from "@/slices/recurrence/entities";

export type AddRecurrence = (data: RecurrenceData) => Promise<RecurrenceEntity | null>;
export type AddRecurrenceSignature = (addRecurrence: AddRecurrenceRepository) => AddRecurrence;
export const addRecurrence: AddRecurrenceSignature =
    (addRecurrenceRepository: AddRecurrenceRepository) => (data: RecurrenceData) => {
        return addRecurrenceRepository.addRecurrence(new RecurrenceEntity(data));
    };
