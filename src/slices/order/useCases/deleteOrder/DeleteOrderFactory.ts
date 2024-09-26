import { makeDatabaseInstance } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { deleteOrder, DeleteOrder } from "@/slices/order/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteOrderFactory = (): DeleteOrder => {
  const repository = new OrderRepository(
    makeDatabaseInstance(whiteLabel.database, "order")
  );
  return deleteOrder(repository);
};
