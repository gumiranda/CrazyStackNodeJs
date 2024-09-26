import { makeDatabaseInstance } from "@/application/infra";
import { TransactionRepository } from "@/slices/payment/transaction/repositories";
import { addTransaction, AddTransaction } from "@/slices/payment/transaction/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeAddTransactionFactory = (): AddTransaction => {
  const repository = new TransactionRepository(
    makeDatabaseInstance(whiteLabel.database, "transaction")
  );
  return addTransaction(repository);
};
