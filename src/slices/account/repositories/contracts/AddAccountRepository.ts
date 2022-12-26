import { AccountData } from "@/slices/account/entities";

export interface AddAccountRepository {
    addAccount(account: AccountData): Promise<AccountData | null>;
}
