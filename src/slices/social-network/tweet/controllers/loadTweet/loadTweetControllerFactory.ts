import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadTweetFactory } from "@/slices/tweet/useCases";
import { LoadTweetController } from "@/slices/tweet/controllers";

export const makeLoadTweetController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadTweet",
    new LoadTweetController(
      makeValidationComposite(requiredFields),
      makeLoadTweetFactory()
    )
  );
};
