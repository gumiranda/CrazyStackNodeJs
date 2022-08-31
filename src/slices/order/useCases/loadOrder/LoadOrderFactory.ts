import { MongoRepository } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { loadOrder, LoadOrder } from "@/slices/order/useCases";

export const makeLoadOrderFactory = (): LoadOrder => {
  const repository = new OrderRepository(new MongoRepository("order"));
  return loadOrder(repository);
};
