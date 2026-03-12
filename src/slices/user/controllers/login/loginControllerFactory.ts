import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeDbAuthentication, makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoginController } from "@/slices/user/controllers";
import { makeLoadUserFactory } from "@/slices/user/useCases";

export const makeLoginController = (): Controller => {
  const requiredFields = ["email", "password", "passwordConfirmation"];
  return makeLogController(
    "login",
    new LoginController(
      makeValidationComposite(requiredFields),
      makeLoadUserFactory(),
      makeDbAuthentication()
    )
  );
};
