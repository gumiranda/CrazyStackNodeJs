import { makeDatabaseInstance } from "@/application/infra";
import { SubscriptionRepository } from "@/slices/payment/subscription/repositories";
import {
  loadSubscriptionByPage,
  LoadSubscriptionByPage,
} from "@/slices/payment/subscription/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadSubscriptionByPageFactory = (): LoadSubscriptionByPage => {
  const repository = new SubscriptionRepository(
    makeDatabaseInstance(whiteLabel.database, "subscription")
  );
  return loadSubscriptionByPage(repository);
};
