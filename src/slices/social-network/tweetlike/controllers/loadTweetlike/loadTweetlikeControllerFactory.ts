import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadTweetlikeFactory } from "@/slices/social-network/tweetlike/useCases";
import { LoadTweetlikeController } from "@/slices/social-network/tweetlike/controllers";

export const makeLoadTweetlikeController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadTweetlike",
    new LoadTweetlikeController(
      makeValidationComposite(requiredFields),
      makeLoadTweetlikeFactory()
    )
  );
};
