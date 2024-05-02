import { Repository } from "@/application/infra/contracts/repository";
import {
  TransactionData,
  TransactionPaginated,
} from "@/slices/payment/transaction/entities";
import {
  AddTransactionRepository,
  DeleteTransactionRepository,
  LoadTransactionByPageRepository,
  LoadTransactionRepository,
  UpdateTransactionRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class TransactionRepository
  implements
    AddTransactionRepository,
    DeleteTransactionRepository,
    LoadTransactionByPageRepository,
    LoadTransactionRepository,
    UpdateTransactionRepository
{
  constructor(private readonly repository: Repository) {}
  async addTransaction(transaction: TransactionData): Promise<TransactionData | null> {
    return this.repository.add(transaction);
  }
  async deleteTransaction(query: Query): Promise<TransactionData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadTransactionByPage(query: Query): Promise<TransactionPaginated | null> {
    const transactions = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { transactions, total };
  }
  async loadTransaction(query: Query): Promise<TransactionData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateTransaction(
    query: Query,
    data: TransactionData
  ): Promise<TransactionData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
