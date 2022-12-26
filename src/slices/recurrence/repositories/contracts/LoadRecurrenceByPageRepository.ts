import { Query } from "@/application/types";
import { RecurrencePaginated } from "@/slices/recurrence/entities";

export interface LoadRecurrenceByPageRepository {
    loadRecurrenceByPage(query: Query): Promise<RecurrencePaginated | null>;
}
