import { makeDatabaseInstance } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { loadOrderByPage, LoadOrderByPage } from "@/slices/order/useCases";

export const makeLoadOrderByPageFactory = (): LoadOrderByPage => {
  const repository = new OrderRepository(makeDatabaseInstance("mongodb", "order"));
  return loadOrderByPage(repository);
};
