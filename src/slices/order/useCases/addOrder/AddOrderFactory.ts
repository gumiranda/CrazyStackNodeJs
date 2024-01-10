import { MongoRepository } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { addOrder, AddOrder } from "@/slices/order/useCases";

export const makeAddOrderFactory = (): AddOrder => {
  const repository = new OrderRepository(new MongoRepository("order"));
  return addOrder(repository);
};
