import { Query } from "@/application/types";
import { TrendData } from "@/slices/social-network/trend/entities";

export interface LoadTrendRepository {
  loadTrend(query: Query): Promise<TrendData | null>;
}
