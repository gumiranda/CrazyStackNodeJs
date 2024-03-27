import { MongoRepository } from "@/application/infra";
import { makeWooviAdapter } from "@/application/infra/payment/WooviAdapter";
import { SubscriptionRepository } from "@/slices/payment/subscription/repositories";
import { addSubscription, AddSubscription } from "@/slices/payment/subscription/useCases";

export const makeAddSubscriptionFactory = (): AddSubscription => {
  const repository = new SubscriptionRepository(new MongoRepository("subscription"));
  return addSubscription(repository, makeWooviAdapter());
};
