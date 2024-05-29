import { makeDatabaseInstance } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { addOrder, AddOrder } from "@/slices/order/useCases";

export const makeAddOrderFactory = (): AddOrder => {
  const repository = new OrderRepository(makeDatabaseInstance("mongodb", "order"));
  return addOrder(repository);
};
