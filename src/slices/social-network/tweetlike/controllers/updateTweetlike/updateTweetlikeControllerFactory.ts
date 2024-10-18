import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateTweetlikeFactory } from "@/slices/tweetlike/useCases";
import { UpdateTweetlikeController } from "@/slices/tweetlike/controllers";

export const makeUpdateTweetlikeController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateTweetlike",
    new UpdateTweetlikeController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateTweetlikeFactory()
    )
  );
};
