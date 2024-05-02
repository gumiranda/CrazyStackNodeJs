import { MongoRepository } from "@/application/infra";
import { TransactionRepository } from "@/slices/payment/transaction/repositories";
import {
  deleteTransaction,
  DeleteTransaction,
} from "@/slices/payment/transaction/useCases";

export const makeDeleteTransactionFactory = (): DeleteTransaction => {
  const repository = new TransactionRepository(new MongoRepository("transaction"));
  return deleteTransaction(repository);
};
