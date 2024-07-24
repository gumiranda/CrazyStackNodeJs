import { LoadInvoiceRepository } from "@/slices/appointment/repositories";
import { AppointmentData } from "@/slices/appointment/entities";
import { Query } from "@/application/types";
import { loadInvoice } from "./LoadInvoice";
import { mock, MockProxy } from "jest-mock-extended";
import { fakeAppointmentEntity } from "../../entities/AppointmentEntity.spec";

describe("loadInvoice", () => {
  let loadInvoiceRepository: MockProxy<LoadInvoiceRepository>;
  let testInstance: (query: Query) => Promise<AppointmentData | null>;

  beforeEach(() => {
    loadInvoiceRepository = mock<LoadInvoiceRepository>();
    testInstance = loadInvoice(loadInvoiceRepository);
  });

  it("should call loadInvoice of LoadInvoiceRepository with correct values", async () => {
    const fakeQuery: Query = { fields: { initDate: new Date(), endDate: new Date() } };
    await testInstance(fakeQuery);
    expect(loadInvoiceRepository.loadInvoice).toHaveBeenCalledWith(fakeQuery);
  });

  it("should return the result of loadInvoice of LoadInvoiceRepository", async () => {
    const fakeQuery: Query = { fields: { initDate: new Date(), endDate: new Date() } };

    loadInvoiceRepository.loadInvoice.mockResolvedValue(fakeAppointmentEntity);
    const result = await testInstance(fakeQuery);
    expect(result).toEqual(fakeAppointmentEntity);
  });

  it("should rethrow if loadInvoice of LoadInvoiceRepository throws", async () => {
    const fakeQuery: Query = { fields: { initDate: new Date(), endDate: new Date() } };
    loadInvoiceRepository.loadInvoice.mockRejectedValue(new Error("Error"));
    const result = testInstance(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
