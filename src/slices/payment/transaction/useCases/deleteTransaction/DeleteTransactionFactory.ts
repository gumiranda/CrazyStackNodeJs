import { makeDatabaseInstance } from "@/application/infra";
import { TransactionRepository } from "@/slices/payment/transaction/repositories";
import {
  deleteTransaction,
  DeleteTransaction,
} from "@/slices/payment/transaction/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteTransactionFactory = (): DeleteTransaction => {
  const repository = new TransactionRepository(
    makeDatabaseInstance(whiteLabel.database, "transaction")
  );
  return deleteTransaction(repository);
};
