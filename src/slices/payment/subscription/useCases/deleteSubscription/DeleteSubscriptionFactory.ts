import { makeDatabaseInstance } from "@/application/infra";
import { SubscriptionRepository } from "@/slices/payment/subscription/repositories";
import {
  deleteSubscription,
  DeleteSubscription,
} from "@/slices/payment/subscription/useCases";

export const makeDeleteSubscriptionFactory = (): DeleteSubscription => {
  const repository = new SubscriptionRepository(
    makeDatabaseInstance("mongodb", "subscription")
  );
  return deleteSubscription(repository);
};
