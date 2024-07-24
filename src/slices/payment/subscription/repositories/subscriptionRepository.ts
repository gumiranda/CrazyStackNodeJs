import { Repository } from "@/application/infra/contracts/repository";
import {
  SubscriptionData,
  SubscriptionPaginated,
} from "@/slices/payment/subscription/entities";
import {
  AddSubscriptionRepository,
  DeleteSubscriptionRepository,
  LoadSubscriptionByPageRepository,
  LoadSubscriptionRepository,
  UpdateSubscriptionRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class SubscriptionRepository
  implements
    AddSubscriptionRepository,
    DeleteSubscriptionRepository,
    LoadSubscriptionByPageRepository,
    LoadSubscriptionRepository,
    UpdateSubscriptionRepository
{
  constructor(private readonly repository: Repository) {}
  async addSubscription(subscription: SubscriptionData): Promise<SubscriptionData | null> {
    return this.repository.add(subscription);
  }
  async deleteSubscription(query: Query): Promise<SubscriptionData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadSubscriptionByPage(query: Query): Promise<SubscriptionPaginated | null> {
    const subscriptions = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { subscriptions, total };
  }
  async loadSubscription(query: Query): Promise<SubscriptionData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateSubscription(
    query: Query,
    data: SubscriptionData
  ): Promise<SubscriptionData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
