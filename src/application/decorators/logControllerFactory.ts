import { Controller } from "@/application/infra/contracts";
import { LogMongoRepository } from "@/application/infra/database/mongodb/repository";
import { LogController } from "@/application/decorators";
export const makeLogController = (domain: string, controller: Controller): Controller => {
  return new LogController(domain, controller, new LogMongoRepository());
};
