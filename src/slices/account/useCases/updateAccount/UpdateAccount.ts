import { UpdateAccountRepository } from "@/slices/account/repositories";
import { AccountData } from "@/slices/account/entities";
import { Query } from "@/application/types";

export type UpdateAccount = (
    query: Query,
    data: AccountData
) => Promise<AccountData | null>;
export type UpdateAccountSignature = (
    updateAccount: UpdateAccountRepository
) => UpdateAccount;
export const updateAccount: UpdateAccountSignature =
    (updateAccountRepository: UpdateAccountRepository) =>
    async (query: Query, data: AccountData) => {
        return updateAccountRepository.updateAccount(query, data);
    };
