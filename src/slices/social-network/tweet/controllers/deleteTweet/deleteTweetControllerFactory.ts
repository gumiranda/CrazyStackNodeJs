import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import {
  makeDeleteTweetFactory,
  makeLoadTweetFactory,
} from "@/slices/social-network/tweet/useCases";
import { DeleteTweetController } from "@/slices/social-network/tweet/controllers";
import { makeRemoveTrendFactory } from "@/slices/social-network/trend/useCases";

export const makeDeleteTweetController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteTweet",
    new DeleteTweetController(
      makeValidationComposite(requiredFields),
      makeDeleteTweetFactory(),
      makeLoadTweetFactory(),
      makeRemoveTrendFactory()
    )
  );
};
