import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadTweetlikeByPageFactory } from "@/slices/social-network/tweetlike/useCases";
import { LoadTweetlikeByPageController } from "@/slices/social-network/tweetlike/controllers";

export const makeLoadTweetlikeByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadTweetlikeByPage",
    new LoadTweetlikeByPageController(
      makeValidationComposite(requiredFields),
      makeLoadTweetlikeByPageFactory()
    )
  );
};
