import { Repository } from "@/application/infra/contracts/repository";
import { FidelityData, FidelityPaginated } from "@/slices/fidelity/entities";
import {
    AddFidelityRepository,
    DeleteFidelityRepository,
    LoadFidelityByPageRepository,
    LoadFidelityRepository,
    UpdateFidelityRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class FidelityRepository
    implements
        AddFidelityRepository,
        DeleteFidelityRepository,
        LoadFidelityByPageRepository,
        LoadFidelityRepository,
        UpdateFidelityRepository
{
    constructor(private readonly repository: Repository) {}
    async addFidelity(fidelity: FidelityData): Promise<FidelityData | null> {
        return this.repository.add(fidelity);
    }
    async deleteFidelity(query: Query): Promise<FidelityData | null> {
        return this.repository.deleteOne(query?.fields);
    }
    async loadFidelityByPage(query: Query): Promise<FidelityPaginated | null> {
        const fidelitys = await this.repository.getPaginate(
            query?.options?.page ?? 0,
            query?.fields ?? {},
            query?.options?.sort ?? { createdAt: -1 },
            10,
            query?.options?.projection ?? {}
        );
        const total = await this.repository.getCount(query?.fields ?? {});
        return { fidelitys, total };
    }
    async loadFidelity(query: Query): Promise<FidelityData | null> {
        return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
    }
    async updateFidelity(query: Query, data: FidelityData): Promise<FidelityData | null> {
        return this.repository.update(query?.fields ?? {}, data);
    }
}
