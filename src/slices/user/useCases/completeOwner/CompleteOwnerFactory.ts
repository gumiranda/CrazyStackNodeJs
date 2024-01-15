import { completeOwner, CompleteOwner } from "@/slices/user/useCases";
import { makeAddCategoryFactory } from "@/slices/category/useCases";
import { makeAddOwnerFactory } from "@/slices/owner/useCases";
import { makeAddServiceFactory } from "@/slices/service/useCases";
import { UserRepository } from "../../repositories";
import { MongoRepository } from "@/application/infra";
export const makeCompleteOwnerFactory = (): CompleteOwner => {
  const repository = new UserRepository(new MongoRepository("user"));
  return completeOwner(
    repository,
    makeAddCategoryFactory(),
    makeAddServiceFactory(),
    makeAddOwnerFactory()
  );
};
