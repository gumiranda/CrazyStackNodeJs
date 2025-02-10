import { DeleteTrendRepository } from "@/slices/social-network/trend/repositories";
import { TrendData } from "@/slices/social-network/trend/entities";
import { Query } from "@/application/types";

export type DeleteTrend = (query: Query) => Promise<TrendData | null>;
export type DeleteTrendSignature = (deleteTrend: DeleteTrendRepository) => DeleteTrend;
export const deleteTrend: DeleteTrendSignature =
  (deleteTrendRepository: DeleteTrendRepository) => (query: Query) => {
    return deleteTrendRepository.deleteTrend(query);
  };
