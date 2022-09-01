import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeDbAuthentication, makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddAccountFactory } from "@/slices/account/useCases";
import { SignupController } from "@/slices/user/controllers";
import { makeAddUserFactory, makeLoadUserFactory } from "@/slices/user/useCases";

export const makeSignupController = (): Controller => {
  const requiredFields = [
    "email",
    "name",
    "password",
    "passwordConfirmation",
    "coord",
    "role",
  ];
  return makeLogController(
    "signup",
    new SignupController(
      makeValidationComposite(requiredFields),
      makeAddUserFactory(),
      makeLoadUserFactory(),
      makeDbAuthentication(),
      makeAddAccountFactory()
    )
  );
};
