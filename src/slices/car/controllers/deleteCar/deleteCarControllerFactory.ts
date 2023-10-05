import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteCarFactory } from "@/slices/car/useCases";
import { DeleteCarController } from "@/slices/car/controllers";

export const makeDeleteCarController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteCar",
    new DeleteCarController(
      makeValidationComposite(requiredFields),
      makeDeleteCarFactory()
    )
  );
};
