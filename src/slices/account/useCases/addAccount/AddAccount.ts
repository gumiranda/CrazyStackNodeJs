import {
  AddAccountRepository,
  DeleteAccountRepository,
} from "@/slices/account/repositories";
import { AccountEntity, AccountData } from "@/slices/account/entities";

export type AddAccount = (data: AccountData) => Promise<AccountEntity | null>;
export type AddAccountSignature = (
  addAccount: AddAccountRepository & DeleteAccountRepository
) => AddAccount;
export const addAccount: AddAccountSignature =
  (accountRepository: AddAccountRepository & DeleteAccountRepository) =>
  async (data: AccountData) => {
    if (data?.createdById) {
      await accountRepository.deleteAccount({
        fields: { createdById: data?.createdById },
        options: {},
      });
    }
    return accountRepository.addAccount(new AccountEntity(data));
  };
