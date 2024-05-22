import { UserRepository } from "@/slices/user/repositories";
import { CompleteOwner, completeOwner } from "./CompleteOwner";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { makeAddCategoryFactory } from "@/slices/category/useCases";
import { makeAddServiceFactory } from "@/slices/service/useCases";
import { makeAddOwnerFactory } from "@/slices/owner/useCases";
import { makeAddClientFactory } from "@/slices/client/useCases";
import { makeAddCustomerFactory } from "@/slices/payment/customer/useCases";
import { makeAddSubscriptionFactory } from "@/slices/payment/subscription/useCases";

export const makeCompleteOwnerFactory = (): CompleteOwner => {
  const repository = new UserRepository(
    makeDatabaseInstance(whiteLabel.database, "users")
  );
  return completeOwner(
    repository,
    makeAddCategoryFactory(),
    makeAddServiceFactory(),
    makeAddOwnerFactory(),
    makeAddClientFactory(),
    makeAddCustomerFactory(),
    makeAddSubscriptionFactory()
  );
};
