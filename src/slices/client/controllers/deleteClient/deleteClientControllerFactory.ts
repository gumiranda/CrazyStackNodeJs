import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteClientFactory } from "@/slices/client/useCases";
import { DeleteClientController } from "@/slices/client/controllers";

export const makeDeleteClientController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteClient",
    new DeleteClientController(
      makeValidationComposite(requiredFields),
      makeDeleteClientFactory()
    )
  );
};
