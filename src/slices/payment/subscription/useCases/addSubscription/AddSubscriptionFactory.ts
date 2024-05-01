import { MongoRepository } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makePaymentAdapter } from "@/application/infra/payment/paymentAdapter";
import { SubscriptionRepository } from "@/slices/payment/subscription/repositories";
import { addSubscription, AddSubscription } from "@/slices/payment/subscription/useCases";

export const makeAddSubscriptionFactory = (): AddSubscription => {
  const repository = new SubscriptionRepository(new MongoRepository("subscription"));
  return addSubscription(repository, makePaymentAdapter(whiteLabel.gatewayPix));
};
