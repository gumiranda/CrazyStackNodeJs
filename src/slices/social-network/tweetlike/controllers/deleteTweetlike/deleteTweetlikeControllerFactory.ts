import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteTweetlikeFactory } from "@/slices/tweetlike/useCases";
import { DeleteTweetlikeController } from "@/slices/tweetlike/controllers";

export const makeDeleteTweetlikeController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteTweetlike",
    new DeleteTweetlikeController(
      makeValidationComposite(requiredFields),
      makeDeleteTweetlikeFactory()
    )
  );
};
