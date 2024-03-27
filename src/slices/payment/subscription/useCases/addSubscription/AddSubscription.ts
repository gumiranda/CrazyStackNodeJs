import { AddSubscriptionRepository } from "@/slices/payment/subscription/repositories";
import {
  SubscriptionEntity,
  SubscriptionData,
} from "@/slices/payment/subscription/entities";

export type AddSubscription = (
  data: SubscriptionData
) => Promise<SubscriptionEntity | null>;
export type AddSubscriptionSignature = (
  addSubscription: AddSubscriptionRepository
) => AddSubscription;
export const addSubscription: AddSubscriptionSignature =
  (addSubscriptionRepository: AddSubscriptionRepository) => (data: SubscriptionData) => {
    return addSubscriptionRepository.addSubscription(new SubscriptionEntity(data));
  };
