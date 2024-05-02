import { MongoRepository } from "@/application/infra";
import { TransactionRepository } from "@/slices/payment/transaction/repositories";
import { loadTransaction, LoadTransaction } from "@/slices/payment/transaction/useCases";

export const makeLoadTransactionFactory = (): LoadTransaction => {
  const repository = new TransactionRepository(new MongoRepository("transaction"));
  return loadTransaction(repository);
};
