import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import {
  makeAddTweetlikeFactory,
  makeDeleteTweetlikeFactory,
  makeLoadTweetlikeFactory,
} from "@/slices/social-network/tweetlike/useCases";
import { ToggleTweetlikeController } from "./toggleTweetlikeController";

export const makeToggleTweetlikeController = (): Controller => {
  const requiredFields = ["tweetId"];
  return makeLogController(
    "toggleTweetlike",
    new ToggleTweetlikeController(
      makeValidationComposite(requiredFields),
      makeAddTweetlikeFactory(),
      makeLoadTweetlikeFactory(),
      makeDeleteTweetlikeFactory()
    )
  );
};
