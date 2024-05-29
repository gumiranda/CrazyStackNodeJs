import { makeDatabaseInstance } from "@/application/infra";
import { TransactionRepository } from "@/slices/payment/transaction/repositories";
import {
  updateTransaction,
  UpdateTransaction,
} from "@/slices/payment/transaction/useCases";

export const makeUpdateTransactionFactory = (): UpdateTransaction => {
  const repository = new TransactionRepository(
    makeDatabaseInstance("mongodb", "transaction")
  );
  return updateTransaction(repository);
};
