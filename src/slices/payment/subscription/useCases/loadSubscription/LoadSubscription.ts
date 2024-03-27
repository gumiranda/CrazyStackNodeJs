import { LoadSubscriptionRepository } from "@/slices/payment/subscription/repositories";
import { SubscriptionData } from "@/slices/payment/subscription/entities";
import { Query } from "@/application/types";

export type LoadSubscription = (query: Query) => Promise<SubscriptionData | null>;
export type LoadSubscriptionSignature = (
  loadSubscription: LoadSubscriptionRepository
) => LoadSubscription;
export const loadSubscription: LoadSubscriptionSignature =
  (loadSubscriptionRepository: LoadSubscriptionRepository) => async (query: Query) => {
    return loadSubscriptionRepository.loadSubscription(query);
  };
