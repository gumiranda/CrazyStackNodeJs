import { Query } from "@/application/types";
import { TrendPaginated } from "@/slices/social-network/trend/entities";

export interface LoadTrendByPageRepository {
  loadTrendByPage(query: Query): Promise<TrendPaginated | null>;
}
