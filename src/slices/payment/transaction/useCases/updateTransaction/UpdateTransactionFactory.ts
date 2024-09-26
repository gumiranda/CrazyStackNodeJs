import { makeDatabaseInstance } from "@/application/infra";
import { TransactionRepository } from "@/slices/payment/transaction/repositories";
import {
  updateTransaction,
  UpdateTransaction,
} from "@/slices/payment/transaction/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateTransactionFactory = (): UpdateTransaction => {
  const repository = new TransactionRepository(
    makeDatabaseInstance(whiteLabel.database, "transaction")
  );
  return updateTransaction(repository);
};
