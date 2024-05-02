import { DeleteTransactionRepository } from "@/slices/payment/transaction/repositories";
import { TransactionData } from "@/slices/payment/transaction/entities";
import { Query } from "@/application/types";

export type DeleteTransaction = (query: Query) => Promise<TransactionData | null>;
export type DeleteTransactionSignature = (
  deleteTransaction: DeleteTransactionRepository
) => DeleteTransaction;
export const deleteTransaction: DeleteTransactionSignature =
  (deleteTransactionRepository: DeleteTransactionRepository) => (query: Query) => {
    return deleteTransactionRepository.deleteTransaction(query);
  };
