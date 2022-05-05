import { Query } from "@/application/types";
import { AccountData } from "@/slices/account/entities";

export interface DeleteAccountRepository {
    deleteAccount(query: Query): Promise<AccountData | null>;
}
