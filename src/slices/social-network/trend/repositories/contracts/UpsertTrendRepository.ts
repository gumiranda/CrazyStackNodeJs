import { TrendData } from "@/slices/social-network/trend/entities";

export interface UpsertTrendRepository {
  upsertTrend(trend: TrendData): Promise<TrendData | null>;
}
