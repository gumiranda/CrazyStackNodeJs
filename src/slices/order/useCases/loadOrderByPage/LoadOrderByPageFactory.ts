import { makeDatabaseInstance } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { loadOrderByPage, LoadOrderByPage } from "@/slices/order/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadOrderByPageFactory = (): LoadOrderByPage => {
  const repository = new OrderRepository(
    makeDatabaseInstance(whiteLabel.database, "order")
  );
  return loadOrderByPage(repository);
};
