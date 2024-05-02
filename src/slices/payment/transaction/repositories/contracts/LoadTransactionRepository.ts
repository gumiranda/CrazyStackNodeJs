import { Query } from "@/application/types";
import { TransactionData } from "@/slices/payment/transaction/entities";

export interface LoadTransactionRepository {
  loadTransaction(query: Query): Promise<TransactionData | null>;
}
