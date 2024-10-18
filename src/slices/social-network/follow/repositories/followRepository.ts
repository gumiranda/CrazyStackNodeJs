import { Repository } from "@/application/infra/contracts/repository";
import { FollowData, FollowPaginated } from "@/slices/social-network/follow/entities";
import {
  AddFollowRepository,
  DeleteFollowRepository,
  LoadFollowByPageRepository,
  LoadFollowRepository,
  UpdateFollowRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class FollowRepository
  implements
    AddFollowRepository,
    DeleteFollowRepository,
    LoadFollowByPageRepository,
    LoadFollowRepository,
    UpdateFollowRepository
{
  constructor(private readonly repository: Repository) {}
  async addFollow(follow: FollowData): Promise<FollowData | null> {
    return this.repository.add(follow);
  }
  async deleteFollow(query: Query): Promise<FollowData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadFollowByPage(query: Query): Promise<FollowPaginated | null> {
    const follows = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {},
      { users: true }
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { follows, total };
  }
  async loadFollow(query: Query): Promise<FollowData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateFollow(query: Query, data: FollowData): Promise<FollowData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
