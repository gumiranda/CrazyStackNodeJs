import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddTrendFactory } from "@/slices/social-network/trend/useCases";
import { AddTrendController } from "@/slices/social-network/trend/controllers";

export const makeAddTrendController = (): Controller => {
  const requiredFields = ["hashtag"];
  return makeLogController(
    "addTrend",
    new AddTrendController(makeValidationComposite(requiredFields), makeAddTrendFactory())
  );
};
