import { MongoRepository } from "@/application/infra";
import { TransactionRepository } from "@/slices/payment/transaction/repositories";
import {
  loadTransactionByPage,
  LoadTransactionByPage,
} from "@/slices/payment/transaction/useCases";

export const makeLoadTransactionByPageFactory = (): LoadTransactionByPage => {
  const repository = new TransactionRepository(new MongoRepository("transaction"));
  return loadTransactionByPage(repository);
};
