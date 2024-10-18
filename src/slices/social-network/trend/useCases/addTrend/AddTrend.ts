import { AddTrendRepository } from "@/slices/trend/repositories";
import { TrendEntity, TrendData } from "@/slices/trend/entities";

export type AddTrend = (data: TrendData) => Promise<TrendEntity | null>;
export type AddTrendSignature = (addTrend: AddTrendRepository) => AddTrend;
export const addTrend: AddTrendSignature =
    (addTrendRepository: AddTrendRepository) => (data: TrendData) => {
        return addTrendRepository.addTrend(new TrendEntity(data));
    };
