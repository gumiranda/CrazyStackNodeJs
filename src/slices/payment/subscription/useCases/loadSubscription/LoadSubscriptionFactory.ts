import { makeDatabaseInstance } from "@/application/infra";
import { loadSubscription, LoadSubscription } from "./LoadSubscription";
import { SubscriptionRepository } from "../../repositories";
import { makePaymentAdapter } from "@/application/infra/payment/paymentAdapter";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadSubscriptionFactory = (): LoadSubscription => {
  const repository = new SubscriptionRepository(
    makeDatabaseInstance(whiteLabel.database, "subscription")
  );
  return loadSubscription(repository, makePaymentAdapter(whiteLabel.gatewayPix));
};
