import { MongoRepository } from "@/application/infra";
import { SubscriptionRepository } from "@/slices/payment/subscription/repositories";
import {
  loadSubscriptionByPage,
  LoadSubscriptionByPage,
} from "@/slices/payment/subscription/useCases";

export const makeLoadSubscriptionByPageFactory = (): LoadSubscriptionByPage => {
  const repository = new SubscriptionRepository(new MongoRepository("subscription"));
  return loadSubscriptionByPage(repository);
};
