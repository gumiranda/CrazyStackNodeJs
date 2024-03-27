import { Query } from "@/application/types";
import { SubscriptionData } from "@/slices/payment/subscription/entities";

export interface LoadSubscriptionRepository {
  loadSubscription(query: Query): Promise<SubscriptionData | null>;
}
