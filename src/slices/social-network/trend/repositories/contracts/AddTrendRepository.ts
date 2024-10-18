import { TrendData } from "@/slices/trend/entities";

export interface AddTrendRepository {
    addTrend(trend: TrendData): Promise<TrendData | null>;
}
