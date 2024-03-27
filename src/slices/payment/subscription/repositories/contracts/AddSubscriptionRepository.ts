import { SubscriptionData } from "@/slices/payment/subscription/entities";

export interface AddSubscriptionRepository {
  addSubscription(subscription: SubscriptionData): Promise<SubscriptionData | null>;
}
