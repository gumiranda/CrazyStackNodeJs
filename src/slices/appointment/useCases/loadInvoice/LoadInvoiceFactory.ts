import { MongoRepository } from "@/application/infra";
import { loadInvoice, LoadInvoice } from "@/slices/appointment/useCases";
import { AppointmentAggregateRepository } from "../../repositories/aggregates/appointmentAggregateRepository";

export const makeLoadInvoiceFactory = (): LoadInvoice => {
  const repository = new AppointmentAggregateRepository(
    new MongoRepository("appointment")
  );
  return loadInvoice(repository);
};
