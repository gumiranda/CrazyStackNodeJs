import { DeleteAccountRepository } from "@/slices/account/repositories";
import { AccountData } from "@/slices/account/entities";
import { Query } from "@/application/types";

export type DeleteAccount = (query: Query) => Promise<AccountData | null>;
export type DeleteAccountSignature = (
    deleteAccount: DeleteAccountRepository
) => DeleteAccount;
export const deleteAccount: DeleteAccountSignature =
    (deleteAccountRepository: DeleteAccountRepository) => (query: Query) => {
        return deleteAccountRepository.deleteAccount(query);
    };
