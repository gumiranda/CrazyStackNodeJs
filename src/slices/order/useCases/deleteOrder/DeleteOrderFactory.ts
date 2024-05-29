import { makeDatabaseInstance } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { deleteOrder, DeleteOrder } from "@/slices/order/useCases";

export const makeDeleteOrderFactory = (): DeleteOrder => {
  const repository = new OrderRepository(makeDatabaseInstance("mongodb", "order"));
  return deleteOrder(repository);
};
