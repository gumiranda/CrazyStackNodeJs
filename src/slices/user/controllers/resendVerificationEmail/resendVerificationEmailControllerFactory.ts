import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { ResendVerificationEmailController } from "@/slices/user/controllers";
import { makeUpdateUserFactory } from "@/slices/user/useCases";

export const makeResendVerificationEmailController = (): Controller => {
  const requiredFields = ["email"];
  return makeLogController(
    "resendverificationemail",
    new ResendVerificationEmailController(
      makeValidationComposite(requiredFields),
      makeUpdateUserFactory()
    )
  );
};
