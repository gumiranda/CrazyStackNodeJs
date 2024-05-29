import { makeDatabaseInstance } from "@/application/infra";
import { TransactionRepository } from "@/slices/payment/transaction/repositories";
import { addTransaction, AddTransaction } from "@/slices/payment/transaction/useCases";

export const makeAddTransactionFactory = (): AddTransaction => {
  const repository = new TransactionRepository(
    makeDatabaseInstance("mongodb", "transaction")
  );
  return addTransaction(repository);
};
