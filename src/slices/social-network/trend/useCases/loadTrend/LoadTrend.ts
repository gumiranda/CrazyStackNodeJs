import { LoadTrendRepository } from "@/slices/social-network/trend/repositories";
import { TrendData } from "@/slices/social-network/trend/entities";
import { Query } from "@/application/types";

export type LoadTrend = (query: Query) => Promise<TrendData | null>;
export type LoadTrendSignature = (loadTrend: LoadTrendRepository) => LoadTrend;
export const loadTrend: LoadTrendSignature =
  (loadTrendRepository: LoadTrendRepository) => async (query: Query) => {
    return loadTrendRepository.loadTrend(query);
  };
