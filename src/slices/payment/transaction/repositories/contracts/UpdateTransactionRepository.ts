import { Query } from "@/application/types";
import { TransactionData } from "@/slices/payment/transaction/entities";

export interface UpdateTransactionRepository {
  updateTransaction(query: Query, data: TransactionData): Promise<TransactionData | null>;
}
