import {
  loadInvoice,
  LoadInvoice,
  makeAggregateRepository,
} from "@/slices/appointment/useCases";

export const makeLoadInvoiceFactory = (): LoadInvoice => {
  return loadInvoice(makeAggregateRepository());
};
