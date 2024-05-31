import { makeDatabaseInstance } from "@/application/infra";
import { ChargeRepository } from "@/slices/payment/charge/repositories";
import { loadChargeByPage, LoadChargeByPage } from "@/slices/payment/charge/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadChargeByPageFactory = (): LoadChargeByPage => {
  const repository = new ChargeRepository(
    makeDatabaseInstance(whiteLabel.database, "charge")
  );
  return loadChargeByPage(repository);
};
