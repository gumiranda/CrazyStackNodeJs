import { AddTransactionRepository } from "@/slices/payment/transaction/repositories";
import { TransactionEntity, TransactionData } from "@/slices/payment/transaction/entities";

export type AddTransaction = (data: TransactionData) => Promise<TransactionEntity | null>;
export type AddTransactionSignature = (
  addTransaction: AddTransactionRepository
) => AddTransaction;
export const addTransaction: AddTransactionSignature =
  (addTransactionRepository: AddTransactionRepository) => (data: TransactionData) => {
    return addTransactionRepository.addTransaction(new TransactionEntity(data));
  };
