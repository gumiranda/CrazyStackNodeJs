import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddTweetlikeFactory } from "@/slices/social-network/tweetlike/useCases";
import { AddTweetlikeController } from "@/slices/social-network/tweetlike/controllers";

export const makeAddTweetlikeController = (): Controller => {
  const requiredFields = ["userSlug", "tweetId"];
  return makeLogController(
    "addTweetlike",
    new AddTweetlikeController(
      makeValidationComposite(requiredFields),
      makeAddTweetlikeFactory()
    )
  );
};
