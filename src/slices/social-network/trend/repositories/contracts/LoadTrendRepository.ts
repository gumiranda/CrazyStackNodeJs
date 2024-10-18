import { Query } from "@/application/types";
import { TrendData } from "@/slices/trend/entities";

export interface LoadTrendRepository {
    loadTrend(query: Query): Promise<TrendData | null>;
}
