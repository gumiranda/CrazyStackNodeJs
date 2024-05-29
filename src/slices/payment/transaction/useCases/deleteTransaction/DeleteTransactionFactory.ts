import { makeDatabaseInstance } from "@/application/infra";
import { TransactionRepository } from "@/slices/payment/transaction/repositories";
import {
  deleteTransaction,
  DeleteTransaction,
} from "@/slices/payment/transaction/useCases";

export const makeDeleteTransactionFactory = (): DeleteTransaction => {
  const repository = new TransactionRepository(
    makeDatabaseInstance("mongodb", "transaction")
  );
  return deleteTransaction(repository);
};
