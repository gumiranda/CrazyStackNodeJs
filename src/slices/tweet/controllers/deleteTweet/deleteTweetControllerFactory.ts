import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteTweetFactory } from "@/slices/tweet/useCases";
import { DeleteTweetController } from "@/slices/tweet/controllers";

export const makeDeleteTweetController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteTweet",
    new DeleteTweetController(
      makeValidationComposite(requiredFields),
      makeDeleteTweetFactory()
    )
  );
};
