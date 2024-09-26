import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { OrderRepository } from "@/slices/order/repositories";
import { updateOrder, UpdateOrder } from "@/slices/order/useCases";

export const makeUpdateOrderFactory = (): UpdateOrder => {
  const repository = new OrderRepository(
    makeDatabaseInstance(whiteLabel.database, "order")
  );
  return updateOrder(repository);
};
