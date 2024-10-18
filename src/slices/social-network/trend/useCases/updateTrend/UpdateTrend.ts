import { UpdateTrendRepository } from "@/slices/trend/repositories";
import { TrendData } from "@/slices/trend/entities";
import { Query } from "@/application/types";

export type UpdateTrend = (
    query: Query,
    data: TrendData
) => Promise<TrendData | null>;
export type UpdateTrendSignature = (
    updateTrend: UpdateTrendRepository
) => UpdateTrend;
export const updateTrend: UpdateTrendSignature =
    (updateTrendRepository: UpdateTrendRepository) =>
    async (query: Query, data: TrendData) => {
        return updateTrendRepository.updateTrend(query, data);
    };
