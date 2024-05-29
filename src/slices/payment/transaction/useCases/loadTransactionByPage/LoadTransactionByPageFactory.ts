import { makeDatabaseInstance } from "@/application/infra";
import { TransactionRepository } from "@/slices/payment/transaction/repositories";
import {
  loadTransactionByPage,
  LoadTransactionByPage,
} from "@/slices/payment/transaction/useCases";

export const makeLoadTransactionByPageFactory = (): LoadTransactionByPage => {
  const repository = new TransactionRepository(
    makeDatabaseInstance("mongodb", "transaction")
  );
  return loadTransactionByPage(repository);
};
