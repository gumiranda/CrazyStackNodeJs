import { UpsertTrendRepository } from "@/slices/trend/repositories";
import { TrendData } from "@/slices/trend/entities";
import { Query } from "@/application/types";

export type UpsertTrend = (query: Query, data: TrendData) => Promise<TrendData | null>;
export type UpsertTrendSignature = (upsertTrend: UpsertTrendRepository) => UpsertTrend;
export const upsertTrend: UpsertTrendSignature =
  (upsertTrendRepository: UpsertTrendRepository) =>
  async (query: Query, data: TrendData) => {
    return upsertTrendRepository.upsertTrend(query, data);
  };
