import { MongoRepository } from "@/application/infra";
import { ChargeRepository } from "@/slices/payment/charge/repositories";
import { loadChargeByPage, LoadChargeByPage } from "@/slices/payment/charge/useCases";

export const makeLoadChargeByPageFactory = (): LoadChargeByPage => {
  const repository = new ChargeRepository(new MongoRepository("charge"));
  return loadChargeByPage(repository);
};
