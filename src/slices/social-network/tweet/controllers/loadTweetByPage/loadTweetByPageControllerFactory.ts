import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadTweetByPageFactory } from "@/slices/tweet/useCases";
import { LoadTweetByPageController } from "@/slices/tweet/controllers";

export const makeLoadTweetByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadTweetByPage",
    new LoadTweetByPageController(
      makeValidationComposite(requiredFields),
      makeLoadTweetByPageFactory()
    )
  );
};
