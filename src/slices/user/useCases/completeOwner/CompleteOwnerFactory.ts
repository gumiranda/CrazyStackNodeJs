import { UserRepository } from "@/slices/user/repositories";
import { CompleteOwner, completeOwner } from "./CompleteOwner";
import { MongoRepository } from "@/application/infra";
import { makeAddCategoryFactory } from "@/slices/category/useCases";
import { makeAddServiceFactory } from "@/slices/service/useCases";
import { makeAddOwnerFactory } from "@/slices/owner/useCases";
import { makeAddClientFactory } from "@/slices/client/useCases";
import { makeAddCustomerFactory } from "@/slices/payment/customer/useCases";
import { makeAddSubscriptionFactory } from "@/slices/payment/subscription/useCases";

export const makeCompleteOwnerFactory = (): CompleteOwner => {
  const repository = new UserRepository(new MongoRepository("user"));
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
