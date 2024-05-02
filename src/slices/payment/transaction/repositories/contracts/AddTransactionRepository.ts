import { TransactionData } from "@/slices/payment/transaction/entities";

export interface AddTransactionRepository {
  addTransaction(transaction: TransactionData): Promise<TransactionData | null>;
}
