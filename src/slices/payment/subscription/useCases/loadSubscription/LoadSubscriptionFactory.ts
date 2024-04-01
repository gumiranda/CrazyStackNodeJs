import { MongoRepository } from "@/application/infra";
import { loadSubscription, LoadSubscription } from "./LoadSubscription";
import { SubscriptionRepository } from "../../repositories";
import { makePaymentAdapter } from "@/application/infra/payment/paymentAdapter";

export const makeLoadSubscriptionFactory = (): LoadSubscription => {
  const repository = new SubscriptionRepository(new MongoRepository("subscription"));
  return loadSubscription(repository, makePaymentAdapter("pagarme"));
};
