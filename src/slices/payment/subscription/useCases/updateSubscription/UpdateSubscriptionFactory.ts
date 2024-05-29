import { makeDatabaseInstance } from "@/application/infra";
import { SubscriptionRepository } from "@/slices/payment/subscription/repositories";
import {
  updateSubscription,
  UpdateSubscription,
} from "@/slices/payment/subscription/useCases";

export const makeUpdateSubscriptionFactory = (): UpdateSubscription => {
  const repository = new SubscriptionRepository(
    makeDatabaseInstance("mongodb", "subscription")
  );
  return updateSubscription(repository);
};
