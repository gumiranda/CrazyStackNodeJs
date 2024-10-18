import { Repository } from "@/application/infra/contracts/repository";
import { TrendData, TrendPaginated } from "@/slices/trend/entities";
import {
    AddTrendRepository,
    DeleteTrendRepository,
    LoadTrendByPageRepository,
    LoadTrendRepository,
    UpdateTrendRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class TrendRepository
    implements
        AddTrendRepository,
        DeleteTrendRepository,
        LoadTrendByPageRepository,
        LoadTrendRepository,
        UpdateTrendRepository
{
    constructor(private readonly repository: Repository) {}
    async addTrend(trend: TrendData): Promise<TrendData | null> {
        return this.repository.add(trend);
    }
    async deleteTrend(query: Query): Promise<TrendData | null> {
        return this.repository.deleteOne(query?.fields);
    }
    async loadTrendByPage(query: Query): Promise<TrendPaginated | null> {
        const trends = await this.repository.getPaginate(
            query?.options?.page ?? 0,
            query?.fields ?? {},
            query?.options?.sort ?? { createdAt: -1 },
            10,
            query?.options?.projection ?? {}
        );
        const total = await this.repository.getCount(query?.fields ?? {});
        return { trends, total };
    }
    async loadTrend(query: Query): Promise<TrendData | null> {
        return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
    }
    async updateTrend(query: Query, data: TrendData): Promise<TrendData | null> {
        return this.repository.update(query?.fields ?? {}, data);
    }
}
