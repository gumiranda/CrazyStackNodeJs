import { Query } from "@/application/types";
import { AccountData } from "@/slices/account/entities";

export interface LoadAccountRepository {
    loadAccount(query: Query): Promise<AccountData | null>;
}
