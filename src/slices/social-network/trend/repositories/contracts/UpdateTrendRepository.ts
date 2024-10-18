import { Query } from "@/application/types";
import { TrendData } from "@/slices/trend/entities";

export interface UpdateTrendRepository {
    updateTrend(query: Query, data: TrendData): Promise<TrendData | null>;
}
