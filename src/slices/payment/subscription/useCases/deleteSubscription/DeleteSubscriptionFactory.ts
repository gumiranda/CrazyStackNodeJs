import { makeDatabaseInstance } from "@/application/infra";
import { SubscriptionRepository } from "@/slices/payment/subscription/repositories";
import {
  deleteSubscription,
  DeleteSubscription,
} from "@/slices/payment/subscription/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteSubscriptionFactory = (): DeleteSubscription => {
  const repository = new SubscriptionRepository(
    makeDatabaseInstance(whiteLabel.database, "subscription")
  );
  return deleteSubscription(repository);
};
