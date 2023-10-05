import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddCarFactory } from "@/slices/car/useCases";
import { AddCarController } from "@/slices/car/controllers";

export const makeAddCarController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addCar",
    new AddCarController(makeValidationComposite(requiredFields), makeAddCarFactory())
  );
};
