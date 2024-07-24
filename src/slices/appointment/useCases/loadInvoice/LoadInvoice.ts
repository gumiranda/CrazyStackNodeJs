import { LoadInvoiceRepository } from "@/slices/appointment/repositories";
import { AppointmentData } from "@/slices/appointment/entities";
import { Query } from "@/application/types";

export type LoadInvoice = (query: Query) => Promise<AppointmentData | null>;
export type LoadInvoiceSignature = (loadInvoice: LoadInvoiceRepository) => LoadInvoice;
export const loadInvoice: LoadInvoiceSignature =
  (loadInvoiceRepository: LoadInvoiceRepository) => async (query: Query) => {
    return loadInvoiceRepository.loadInvoice(query);
  };
