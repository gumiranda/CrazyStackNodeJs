import { Query } from "@/application/types";
import { TransactionData } from "@/slices/payment/transaction/entities";

export interface DeleteTransactionRepository {
  deleteTransaction(query: Query): Promise<TransactionData | null>;
}
