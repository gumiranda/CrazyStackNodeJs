import { makeDatabaseInstance } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { loadOrder, LoadOrder } from "@/slices/order/useCases";

export const makeLoadOrderFactory = (): LoadOrder => {
  const repository = new OrderRepository(makeDatabaseInstance("mongodb", "order"));
  return loadOrder(repository);
};
