import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddUserFactory } from "@/slices/user/useCases";
import { AddUserController } from "@/slices/user/controllers";

export const makeAddUserController = (): Controller => {
  const requiredFields = ["name", "email", "password", "passwordConfirmation", "role"];
  return makeLogController(
    "addUser",
    new AddUserController(makeValidationComposite(requiredFields), makeAddUserFactory())
  );
};
