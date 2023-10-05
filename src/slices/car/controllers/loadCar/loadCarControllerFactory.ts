import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadCarFactory } from "@/slices/car/useCases";
import { LoadCarController } from "@/slices/car/controllers";

export const makeLoadCarController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadCar",
    new LoadCarController(makeValidationComposite(requiredFields), makeLoadCarFactory())
  );
};
