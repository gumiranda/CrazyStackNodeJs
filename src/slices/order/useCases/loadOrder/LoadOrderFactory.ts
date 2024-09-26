import { makeDatabaseInstance } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { loadOrder, LoadOrder } from "@/slices/order/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadOrderFactory = (): LoadOrder => {
  const repository = new OrderRepository(
    makeDatabaseInstance(whiteLabel.database, "order")
  );
  return loadOrder(repository);
};
