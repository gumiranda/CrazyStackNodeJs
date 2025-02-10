import { TrendData } from "@/slices/social-network/trend/entities";

export interface AddTrendRepository {
  addTrend(trend: TrendData): Promise<TrendData | null>;
}
