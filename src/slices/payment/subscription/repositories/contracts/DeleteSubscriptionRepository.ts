import { Query } from "@/application/types";
import { SubscriptionData } from "@/slices/payment/subscription/entities";

export interface DeleteSubscriptionRepository {
  deleteSubscription(query: Query): Promise<SubscriptionData | null>;
}
