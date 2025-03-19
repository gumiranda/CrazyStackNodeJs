import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { VerifyEmailController } from "@/slices/user/controllers";
import { makeLoadUserFactory, makeUpdateUserFactory } from "@/slices/user/useCases";

export const makeVerifyEmailController = (): Controller => {
  const requiredFields = ["email", "code"];
  return makeLogController(
    "verifyemail",
    new VerifyEmailController(
      makeValidationComposite(requiredFields),
      makeUpdateUserFactory(),
      makeLoadUserFactory()
    )
  );
};
