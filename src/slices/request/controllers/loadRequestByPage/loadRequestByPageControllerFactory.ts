import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadRequestByPageFactory } from "@/slices/request/useCases";
import { LoadRequestByPageController } from "@/slices/request/controllers";

export const makeLoadRequestByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadRequestByPage",
    new LoadRequestByPageController(
      makeValidationComposite(requiredFields),
      makeLoadRequestByPageFactory()
    )
  );
};
