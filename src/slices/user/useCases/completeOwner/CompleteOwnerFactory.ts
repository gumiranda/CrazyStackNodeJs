import { completeOwner, CompleteOwner, makeAddUserFactory } from "@/slices/user/useCases";
import { makeAddCategoryFactory } from "@/slices/category/useCases";
import { makeAddOwnerFactory } from "@/slices/owner/useCases";
import { makeAddServiceFactory } from "@/slices/service/useCases";
export const makeCompleteOwnerFactory = (): CompleteOwner => {
  return completeOwner(
    makeAddUserFactory(),
    makeAddCategoryFactory(),
    makeAddServiceFactory(),
    makeAddOwnerFactory()
  );
};
