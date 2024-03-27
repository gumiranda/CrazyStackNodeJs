import { Query } from "@/application/types";
import { SubscriptionData } from "@/slices/payment/subscription/entities";

export interface UpdateSubscriptionRepository {
  updateSubscription(
    query: Query,
    data: SubscriptionData
  ): Promise<SubscriptionData | null>;
}
