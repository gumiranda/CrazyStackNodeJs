import { Query } from "@/application/types";
import { TransactionPaginated } from "@/slices/payment/transaction/entities";

export interface LoadTransactionByPageRepository {
  loadTransactionByPage(query: Query): Promise<TransactionPaginated | null>;
}
