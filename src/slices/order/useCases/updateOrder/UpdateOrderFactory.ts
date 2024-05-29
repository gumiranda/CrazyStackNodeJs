import { makeDatabaseInstance } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { updateOrder, UpdateOrder } from "@/slices/order/useCases";

export const makeUpdateOrderFactory = (): UpdateOrder => {
  const repository = new OrderRepository(makeDatabaseInstance("mongodb", "order"));
  return updateOrder(repository);
};
