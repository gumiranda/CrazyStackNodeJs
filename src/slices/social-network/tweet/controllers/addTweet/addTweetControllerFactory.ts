import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddTweetFactory } from "@/slices/social-network/tweet/useCases";
import { AddTweetController } from "@/slices/social-network/tweet/controllers";
import { makeUpsertTrendFactory } from "@/slices/social-network/trend/useCases";

export const makeAddTweetController = (): Controller => {
  const requiredFields = ["userSlug"];
  return makeLogController(
    "addTweet",
    new AddTweetController(
      makeValidationComposite(requiredFields),
      makeAddTweetFactory(),
      makeUpsertTrendFactory()
    )
  );
};
