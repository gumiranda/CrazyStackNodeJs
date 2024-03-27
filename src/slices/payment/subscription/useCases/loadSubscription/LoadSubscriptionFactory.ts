import { MongoRepository } from "@/application/infra";
import { makeWooviAdapter } from "@/application/infra/payment/WooviAdapter";
import { loadSubscription, LoadSubscription } from "./LoadSubscription";
import { SubscriptionRepository } from "../../repositories";

export const makeLoadSubscriptionFactory = (): LoadSubscription => {
  const repository = new SubscriptionRepository(new MongoRepository("subscription"));
  return loadSubscription(repository, makeWooviAdapter());
};
