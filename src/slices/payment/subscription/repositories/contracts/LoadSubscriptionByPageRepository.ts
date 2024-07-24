import { Query } from "@/application/types";
import { SubscriptionPaginated } from "@/slices/payment/subscription/entities";

export interface LoadSubscriptionByPageRepository {
  loadSubscriptionByPage(query: Query): Promise<SubscriptionPaginated | null>;
}
