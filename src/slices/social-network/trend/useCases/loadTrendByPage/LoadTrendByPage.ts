import { LoadTrendByPageRepository } from "@/slices/trend/repositories";
import { TrendPaginated } from "@/slices/trend/entities";
import { Query } from "@/application/types";

export type LoadTrendByPage = (query: Query) => Promise<TrendPaginated | null>;
export type LoadTrendByPageSignature = (
    loadTrendByPage: LoadTrendByPageRepository
) => LoadTrendByPage;
export const loadTrendByPage: LoadTrendByPageSignature =
    (loadTrendByPageRepository: LoadTrendByPageRepository) =>
    async (query: Query) => {
        return loadTrendByPageRepository.loadTrendByPage(query);
    };
