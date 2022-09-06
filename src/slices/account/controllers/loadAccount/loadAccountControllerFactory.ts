import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeDbAuthentication, makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddAccountFactory, makeLoadAccountFactory } from "@/slices/account/useCases";
import { LoadAccountController } from "@/slices/account/controllers";

export const makeLoadAccountController = (): Controller => {
  const requiredFields: string[] = [];
  return makeLogController(
    "loadAccount",
    new LoadAccountController(
      makeValidationComposite(requiredFields),
      makeLoadAccountFactory(),
      makeAddAccountFactory(),
      makeDbAuthentication()
    )
  );
};
