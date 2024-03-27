import { DeleteSubscriptionRepository } from "@/slices/payment/subscription/repositories";
import { SubscriptionData } from "@/slices/payment/subscription/entities";
import { Query } from "@/application/types";

export type DeleteSubscription = (query: Query) => Promise<SubscriptionData | null>;
export type DeleteSubscriptionSignature = (
  deleteSubscription: DeleteSubscriptionRepository
) => DeleteSubscription;
export const deleteSubscription: DeleteSubscriptionSignature =
  (deleteSubscriptionRepository: DeleteSubscriptionRepository) => (query: Query) => {
    return deleteSubscriptionRepository.deleteSubscription(query);
  };
