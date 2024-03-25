import { Query } from "@/application/types";

export interface LoadInvoiceRepository {
  loadInvoice(query: Query): Promise<any | null>;
}
