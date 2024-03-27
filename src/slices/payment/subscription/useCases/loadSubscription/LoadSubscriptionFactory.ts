import { MongoRepository } from "@/application/infra";
import { SubscriptionRepository } from "@/slices/payment/subscription/repositories";
import {
  loadSubscription,
  LoadSubscription,
} from "@/slices/payment/subscription/useCases";

export const makeLoadSubscriptionFactory = (): LoadSubscription => {
  const repository = new SubscriptionRepository(new MongoRepository("subscription"));
  return loadSubscription(repository);
};
