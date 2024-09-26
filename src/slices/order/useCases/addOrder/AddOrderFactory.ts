import { makeDatabaseInstance } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { addOrder, AddOrder } from "@/slices/order/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeAddOrderFactory = (): AddOrder => {
  const repository = new OrderRepository(
    makeDatabaseInstance(whiteLabel.database, "order")
  );
  return addOrder(repository);
};
