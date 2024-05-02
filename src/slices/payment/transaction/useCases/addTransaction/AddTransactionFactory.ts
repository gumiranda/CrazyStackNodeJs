import { MongoRepository } from "@/application/infra";
import { TransactionRepository } from "@/slices/payment/transaction/repositories";
import { addTransaction, AddTransaction } from "@/slices/payment/transaction/useCases";

export const makeAddTransactionFactory = (): AddTransaction => {
  const repository = new TransactionRepository(new MongoRepository("transaction"));
  return addTransaction(repository);
};
