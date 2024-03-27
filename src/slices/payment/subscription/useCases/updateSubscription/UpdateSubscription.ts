import { UpdateSubscriptionRepository } from "@/slices/payment/subscription/repositories";
import { SubscriptionData } from "@/slices/payment/subscription/entities";
import { Query } from "@/application/types";

export type UpdateSubscription = (
  query: Query,
  data: SubscriptionData
) => Promise<SubscriptionData | null>;
export type UpdateSubscriptionSignature = (
  updateSubscription: UpdateSubscriptionRepository
) => UpdateSubscription;
export const updateSubscription: UpdateSubscriptionSignature =
  (updateSubscriptionRepository: UpdateSubscriptionRepository) =>
  async (query: Query, data: SubscriptionData) => {
    return updateSubscriptionRepository.updateSubscription(query, data);
  };
