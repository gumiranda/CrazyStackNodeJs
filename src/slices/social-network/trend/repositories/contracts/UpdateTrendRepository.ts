import { Query } from "@/application/types";
import { TrendData } from "@/slices/social-network/trend/entities";

export interface UpdateTrendRepository {
  updateTrend(query: Query, data: TrendData): Promise<TrendData | null>;
}
