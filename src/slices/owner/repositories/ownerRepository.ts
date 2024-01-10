import { Repository } from "@/application/infra/contracts/repository";
import { OwnerData, OwnerPaginated } from "@/slices/owner/entities";
import {
  AddOwnerRepository,
  DeleteOwnerRepository,
  LoadOwnerByPageRepository,
  LoadOwnerRepository,
  UpdateOwnerRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class OwnerRepository
  implements
    AddOwnerRepository,
    DeleteOwnerRepository,
    LoadOwnerByPageRepository,
    LoadOwnerRepository,
    UpdateOwnerRepository
{
  constructor(private readonly repository: Repository) {}
  async addOwner(owner: OwnerData): Promise<OwnerData | null> {
    return this.repository.add(owner);
  }
  async deleteOwner(query: Query): Promise<OwnerData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadOwnerByPage(query: Query): Promise<OwnerPaginated | null> {
    const owners = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { owners, total };
  }
  async loadOwner(query: Query): Promise<OwnerData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateOwner(query: Query, data: OwnerData): Promise<OwnerData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
