import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddTweetlikeFactory } from "@/slices/tweetlike/useCases";
import { AddTweetlikeController } from "@/slices/tweetlike/controllers";

export const makeAddTweetlikeController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addTweetlike",
    new AddTweetlikeController(
      makeValidationComposite(requiredFields),
      makeAddTweetlikeFactory()
    )
  );
};
