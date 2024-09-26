import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makePaymentAdapter } from "@/application/infra/payment/paymentAdapter";
import { SubscriptionRepository } from "@/slices/payment/subscription/repositories";
import { addSubscription, AddSubscription } from "@/slices/payment/subscription/useCases";

export const makeAddSubscriptionFactory = (): AddSubscription => {
  const repository = new SubscriptionRepository(
    makeDatabaseInstance(whiteLabel.database, "subscription")
  );
  return addSubscription(repository, makePaymentAdapter(whiteLabel.gatewayPix));
};
