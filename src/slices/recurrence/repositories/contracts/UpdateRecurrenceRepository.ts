import { Query } from "@/application/types";
import { RecurrenceData } from "@/slices/recurrence/entities";

export interface UpdateRecurrenceRepository {
    updateRecurrence(query: Query, data: RecurrenceData): Promise<RecurrenceData | null>;
}
