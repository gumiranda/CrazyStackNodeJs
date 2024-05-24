import { loadInvoice, LoadInvoice } from "@/slices/appointment/useCases";
import { AppointmentAggregatePgRepository } from "../../repositories/aggregates/postgres/appointmentAggregatePgRepository";
import { PostgresRepository } from "@/application/infra/database/postgres/repository/pg-repository";

export const makeLoadInvoiceFactory = (): LoadInvoice => {
  const repository = new AppointmentAggregatePgRepository(
    new PostgresRepository("appointment")
  );
  return loadInvoice(repository);
};
