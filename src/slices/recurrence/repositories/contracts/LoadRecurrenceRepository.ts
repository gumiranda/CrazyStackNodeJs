import { Query } from "@/application/types";
import { RecurrenceData } from "@/slices/recurrence/entities";

export interface LoadRecurrenceRepository {
    loadRecurrence(query: Query): Promise<RecurrenceData | null>;
}
