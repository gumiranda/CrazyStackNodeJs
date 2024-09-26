import { makeDatabaseInstance } from "@/application/infra";
import { TransactionRepository } from "@/slices/payment/transaction/repositories";
import {
  loadTransactionByPage,
  LoadTransactionByPage,
} from "@/slices/payment/transaction/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadTransactionByPageFactory = (): LoadTransactionByPage => {
  const repository = new TransactionRepository(
    makeDatabaseInstance(whiteLabel.database, "transaction")
  );
  return loadTransactionByPage(repository);
};
