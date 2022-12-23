import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadUserByPageFactory } from "@/slices/user/useCases";
import { LoadUserByPageController } from "@/slices/user/controllers";

export const makeLoadUserByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadUserByPage",
    new LoadUserByPageController(
      makeValidationComposite(requiredFields),
      makeLoadUserByPageFactory()
    )
  );
};
