import { AddAccountRepository } from "@/slices/account/repositories";
import { AccountEntity, AccountData } from "@/slices/account/entities";

export type AddAccount = (data: AccountData) => Promise<AccountEntity | null>;
export type AddAccountSignature = (addAccount: AddAccountRepository) => AddAccount;
export const addAccount: AddAccountSignature =
    (addAccountRepository: AddAccountRepository) => (data: AccountData) => {
        return addAccountRepository.addAccount(new AccountEntity(data));
    };
