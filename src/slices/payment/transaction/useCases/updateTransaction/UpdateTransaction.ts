import { UpdateTransactionRepository } from "@/slices/payment/transaction/repositories";
import { TransactionData } from "@/slices/payment/transaction/entities";
import { Query } from "@/application/types";

export type UpdateTransaction = (
  query: Query,
  data: TransactionData
) => Promise<TransactionData | null>;
export type UpdateTransactionSignature = (
  updateTransaction: UpdateTransactionRepository
) => UpdateTransaction;
export const updateTransaction: UpdateTransactionSignature =
  (updateTransactionRepository: UpdateTransactionRepository) =>
  async (query: Query, data: TransactionData) => {
    return updateTransactionRepository.updateTransaction(query, data);
  };
