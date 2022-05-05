import { Query } from "@/application/types";
import { AccountData } from "@/slices/account/entities";

export interface UpdateAccountRepository {
    updateAccount(query: Query, data: AccountData): Promise<AccountData | null>;
}
