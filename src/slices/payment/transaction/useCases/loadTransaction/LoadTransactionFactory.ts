import { makeDatabaseInstance } from "@/application/infra";
import { TransactionRepository } from "@/slices/payment/transaction/repositories";
import { loadTransaction, LoadTransaction } from "@/slices/payment/transaction/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadTransactionFactory = (): LoadTransaction => {
  const repository = new TransactionRepository(
    makeDatabaseInstance(whiteLabel.database, "transaction")
  );
  return loadTransaction(repository);
};
