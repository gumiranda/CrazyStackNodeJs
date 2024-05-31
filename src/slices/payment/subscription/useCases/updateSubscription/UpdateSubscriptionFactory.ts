import { makeDatabaseInstance } from "@/application/infra";
import { SubscriptionRepository } from "@/slices/payment/subscription/repositories";
import {
  updateSubscription,
  UpdateSubscription,
} from "@/slices/payment/subscription/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateSubscriptionFactory = (): UpdateSubscription => {
  const repository = new SubscriptionRepository(
    makeDatabaseInstance(whiteLabel.database, "subscription")
  );
  return updateSubscription(repository);
};
