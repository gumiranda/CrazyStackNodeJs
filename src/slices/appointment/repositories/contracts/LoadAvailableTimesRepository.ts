import {
    AvailableTimesModelRepository,
    QueryAvailableTimesRepository,
} from "@/slices/appointment/entities";

export interface LoadAvailableTimesRepository {
    loadAvailableTimes(
        query: QueryAvailableTimesRepository
    ): Promise<AvailableTimesModelRepository | null>;
}
