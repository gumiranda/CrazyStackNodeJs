import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddTweetFactory } from "@/slices/tweet/useCases";
import { AddTweetController } from "@/slices/tweet/controllers";

export const makeAddTweetController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addTweet",
    new AddTweetController(
      makeValidationComposite(requiredFields),
      makeAddTweetFactory()
    )
  );
};
