import { Query } from "@/application/types";
import { TrendData } from "@/slices/social-network/trend/entities";

export interface DeleteTrendRepository {
  deleteTrend(query: Query): Promise<TrendData | null>;
}
