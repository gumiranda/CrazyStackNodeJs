import { LoadTransactionByPageRepository } from "@/slices/payment/transaction/repositories";
import { TransactionPaginated } from "@/slices/payment/transaction/entities";
import { Query } from "@/application/types";

export type LoadTransactionByPage = (query: Query) => Promise<TransactionPaginated | null>;
export type LoadTransactionByPageSignature = (
  loadTransactionByPage: LoadTransactionByPageRepository
) => LoadTransactionByPage;
export const loadTransactionByPage: LoadTransactionByPageSignature =
  (loadTransactionByPageRepository: LoadTransactionByPageRepository) =>
  async (query: Query) => {
    return loadTransactionByPageRepository.loadTransactionByPage(query);
  };
