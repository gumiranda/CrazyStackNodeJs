import { makeDatabaseInstance } from "@/application/infra";
import { TransactionRepository } from "@/slices/payment/transaction/repositories";
import { loadTransaction, LoadTransaction } from "@/slices/payment/transaction/useCases";

export const makeLoadTransactionFactory = (): LoadTransaction => {
  const repository = new TransactionRepository(
    makeDatabaseInstance("mongodb", "transaction")
  );
  return loadTransaction(repository);
};
