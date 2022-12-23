/* eslint-disable indent */
import { Repository } from "@/application/infra/contracts/repository";
import { AccountData, AccountPaginated } from "@/slices/account/entities";
import {
  AddAccountRepository,
  DeleteAccountRepository,
  LoadAccountByPageRepository,
  LoadAccountRepository,
  UpdateAccountRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class AccountRepository
  implements
    AddAccountRepository,
    DeleteAccountRepository,
    LoadAccountByPageRepository,
    LoadAccountRepository,
    UpdateAccountRepository
{
  constructor(private readonly repository: Repository) {}
  async addAccount(account: AccountData): Promise<AccountData | null> {
    return this.repository.add(account);
  }
  async deleteAccount(query: Query): Promise<AccountData | null> {
    return this.repository.deleteMany(query?.fields);
  }
  async loadAccountByPage(query: Query): Promise<AccountPaginated | null> {
    const accounts = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { accounts, total };
  }
  async loadAccount(query: Query): Promise<AccountData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateAccount(query: Query, data: AccountData): Promise<AccountData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
