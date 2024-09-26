import { LoadTransactionRepository } from "@/slices/payment/transaction/repositories";
import { TransactionData } from "@/slices/payment/transaction/entities";
import { Query } from "@/application/types";

export type LoadTransaction = (query: Query) => Promise<TransactionData | null>;
export type LoadTransactionSignature = (
  loadTransaction: LoadTransactionRepository
) => LoadTransaction;
export const loadTransaction: LoadTransactionSignature =
  (loadTransactionRepository: LoadTransactionRepository) => async (query: Query) => {
    return loadTransactionRepository.loadTransaction(query);
  };
