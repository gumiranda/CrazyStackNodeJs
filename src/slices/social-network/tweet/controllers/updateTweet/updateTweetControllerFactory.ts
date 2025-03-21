import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import {
  makeLoadTweetFactory,
  makeUpdateTweetFactory,
} from "@/slices/social-network/tweet/useCases";
import { UpdateTweetController } from "@/slices/social-network/tweet/controllers";
import {
  makeRemoveTrendFactory,
  makeUpsertTrendFactory,
} from "@/slices/social-network/trend/useCases";

export const makeUpdateTweetController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateTweet",
    new UpdateTweetController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateTweetFactory(),
      makeLoadTweetFactory(),
      makeUpsertTrendFactory(),
      makeRemoveTrendFactory()
    )
  );
};
