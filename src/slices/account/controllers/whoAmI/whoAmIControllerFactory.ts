import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeDbAuthentication, makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadAccountFactory } from "@/slices/account/useCases";
import { WhoAmIController } from "@/slices/account/controllers";
import { makeLoadUserFactory } from "@/slices/user/useCases";

export const makeWhoAmIController = (): Controller => {
  const requiredFields: string[] = [];
  return makeLogController(
    "loadAccount",
    new WhoAmIController(
      makeValidationComposite(requiredFields),
      makeLoadAccountFactory(),
      makeLoadUserFactory(),
      makeDbAuthentication()
    )
  );
};
