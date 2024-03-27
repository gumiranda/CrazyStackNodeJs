import { Repository } from "@/application/infra/contracts/repository";
import { ChargeData, ChargePaginated } from "@/slices/payment/charge/entities";
import {
  AddChargeRepository,
  DeleteChargeRepository,
  LoadChargeByPageRepository,
  LoadChargeRepository,
  UpdateChargeRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class ChargeRepository
  implements
    AddChargeRepository,
    DeleteChargeRepository,
    LoadChargeByPageRepository,
    LoadChargeRepository,
    UpdateChargeRepository
{
  constructor(private readonly repository: Repository) {}
  async addCharge(charge: ChargeData): Promise<ChargeData | null> {
    return this.repository.add(charge);
  }
  async deleteCharge(query: Query): Promise<ChargeData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadChargeByPage(query: Query): Promise<ChargePaginated | null> {
    const charges = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { charges, total };
  }
  async loadCharge(query: Query): Promise<ChargeData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateCharge(query: Query, data: ChargeData): Promise<ChargeData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
