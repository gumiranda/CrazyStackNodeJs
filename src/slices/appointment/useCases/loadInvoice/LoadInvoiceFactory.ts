import { MongoRepository } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { loadInvoice, LoadInvoice } from "@/slices/appointment/useCases";

export const makeLoadInvoiceFactory = (): LoadInvoice => {
  const repository = new AppointmentRepository(new MongoRepository("appointment"));
  return loadInvoice(repository);
};
