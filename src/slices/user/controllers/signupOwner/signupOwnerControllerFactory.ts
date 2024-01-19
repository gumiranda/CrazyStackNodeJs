import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeDbAuthentication, makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddAccountFactory } from "@/slices/account/useCases";
import { SignupOwnerController } from "@/slices/user/controllers";
import { makeAddUserFactory, makeLoadUserFactory } from "@/slices/user/useCases";

export const makeSignupOwnerController = (): Controller => {
  const requiredFields = [
    "email",
    "name",
    "password",
    "passwordConfirmation",
    "coord",
    "role",
  ];
  return makeLogController(
    "signupOwner",
    new SignupOwnerController(
      makeValidationComposite(requiredFields),
      makeAddUserFactory(),
      makeLoadUserFactory(),
      makeDbAuthentication(),
      makeAddAccountFactory()
    )
  );
};
