import { describe, it, expect, beforeEach, beforeAll, afterAll, jest, mock as bunMock } from "bun:test";
bunMock.module("@/application/infra", () => ({
  env: { FUSORARIOBR: "development" },
}));

import { AppointmentAggregatePgRepository } from "./appointmentAggregatePgRepository";
import { PostgresRepository } from "@/application/infra/database/postgres/repository/pg-repository";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

describe("AppointmentAggregatePgRepository", () => {
  let testInstance: AppointmentAggregatePgRepository;
  let repository: MockProxy<PostgresRepository>;
  beforeAll(() => {
    MockDate.set(new Date());
    repository = mock<PostgresRepository>();
    repository.aggregate.mockResolvedValue([
      { _id: "1", initDate: new Date(), endDate: new Date(), grand_total: 500 },
    ]);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    jest.clearAllMocks();
    testInstance = new AppointmentAggregatePgRepository(repository);
  });

  describe("loadInvoice", () => {
    it("should return null if initDate is missing", async () => {
      const result = await testInstance.loadInvoice({ fields: { endDate: "2024-01-01" }, options: {} });
      expect(result).toBeNull();
    });
    it("should return null if endDate is missing", async () => {
      const result = await testInstance.loadInvoice({ fields: { initDate: "2024-01-01" }, options: {} });
      expect(result).toBeNull();
    });
    it("should return null if fields is empty", async () => {
      const result = await testInstance.loadInvoice({ fields: {}, options: {} });
      expect(result).toBeNull();
    });
    it("should return appointments and total on success", async () => {
      repository.aggregate
        .mockResolvedValueOnce([{ grand_total: 500 }])
        .mockResolvedValueOnce([{ _id: "1", initDate: new Date(), endDate: new Date(), total_price: 500 }]);
      const result = await testInstance.loadInvoice({
        fields: { initDate: "2024-01-01", endDate: "2024-01-31" },
        options: {},
      });
      expect(result).toBeDefined();
      expect(result.appointments).toBeDefined();
      expect(result.total).toBe(500);
    });
    it("should return 0 as total when grand_total is undefined", async () => {
      repository.aggregate
        .mockResolvedValueOnce([{}])
        .mockResolvedValueOnce([]);
      const result = await testInstance.loadInvoice({
        fields: { initDate: "2024-01-01", endDate: "2024-01-31" },
        options: {},
      });
      expect(result.total).toBe(0);
    });
  });

  describe("loadAvailableTimes", () => {
    it("should return null if professionalId is missing", async () => {
      const result = await testInstance.loadAvailableTimes({
        initDay: "2024-01-01" as any,
        endDay: "2024-01-02" as any,
      } as any);
      expect(result).toBeNull();
    });
    it("should return null if initDay is missing", async () => {
      const result = await testInstance.loadAvailableTimes({
        professionalId: "prof1",
        endDay: "2024-01-02" as any,
      } as any);
      expect(result).toBeNull();
    });
    it("should return null if endDay is missing", async () => {
      const result = await testInstance.loadAvailableTimes({
        professionalId: "prof1",
        initDay: "2024-01-01" as any,
      } as any);
      expect(result).toBeNull();
    });
    it("should return null if no results found", async () => {
      repository.aggregate.mockResolvedValueOnce([]);
      const result = await testInstance.loadAvailableTimes({
        professionalId: "prof1",
        initDay: "2024-01-01" as any,
        endDay: "2024-01-02" as any,
      } as any);
      expect(result).toBeNull();
    });
    it("should return available times on success", async () => {
      const now = new Date();
      repository.aggregate.mockResolvedValueOnce([
        { _id: "1", initDate: now, endDate: now },
      ]);
      const result = await testInstance.loadAvailableTimes({
        professionalId: "prof1",
        initDay: "2024-01-01" as any,
        endDay: "2024-01-02" as any,
      } as any);
      expect(result).toBeDefined();
      expect(result?._id).toBeDefined();
      expect(result?.data).toBeDefined();
    });
    it("should return null if query is null", async () => {
      const result = await testInstance.loadAvailableTimes(null as any);
      expect(result).toBeNull();
    });
    it("should call repository.aggregate with a query", async () => {
      const now = new Date();
      repository.aggregate.mockResolvedValueOnce([
        { _id: "1", initDate: now, endDate: now },
      ]);
      await testInstance.loadAvailableTimes({
        professionalId: "prof1",
        initDay: "2024-01-01" as any,
        endDay: "2024-01-02" as any,
      } as any);
      expect(repository.aggregate).toHaveBeenCalled();
    });
    it("should map initDate and endDate to ISO strings in non-production mode", async () => {
      const now = new Date("2024-06-15T10:00:00.000Z");
      repository.aggregate.mockResolvedValueOnce([
        { _id: "1", initDate: now, endDate: now },
      ]);
      const result = await testInstance.loadAvailableTimes({
        professionalId: "prof1",
        initDay: "2024-01-01" as any,
        endDay: "2024-01-02" as any,
      } as any);
      expect(result).toBeDefined();
      expect(result?.data?.[0]?.initDate).toBe(now.toISOString());
      expect(result?.data?.[0]?.endDate).toBe(now.toISOString());
    });
    it("should rethrow if aggregate throws", async () => {
      repository.aggregate.mockRejectedValueOnce(new Error("pg_error"));
      await expect(
        testInstance.loadAvailableTimes({
          professionalId: "prof1",
          initDay: "2024-01-01" as any,
          endDay: "2024-01-02" as any,
        } as any)
      ).rejects.toThrow("pg_error");
    });
  });

  describe("loadInvoice additional cases", () => {
    it("should return null if query is null", async () => {
      const result = await testInstance.loadInvoice(null as any);
      expect(result).toBeNull();
    });
    it("should call repository.aggregate twice for valid queries", async () => {
      repository.aggregate
        .mockResolvedValueOnce([{ grand_total: 100 }])
        .mockResolvedValueOnce([{ _id: "1", total_price: 100 }]);
      await testInstance.loadInvoice({
        fields: { initDate: "2024-01-01", endDate: "2024-01-31" },
        options: {},
      });
      expect(repository.aggregate).toHaveBeenCalledTimes(2);
    });
    it("should rethrow if aggregate throws on loadInvoice", async () => {
      repository.aggregate.mockRejectedValueOnce(new Error("pg_invoice_error"));
      await expect(
        testInstance.loadInvoice({
          fields: { initDate: "2024-01-01", endDate: "2024-01-31" },
          options: {},
        })
      ).rejects.toThrow("pg_invoice_error");
    });
  });

  describe("loadInvoice query building", () => {
    it("should build subquery with correct field projections", async () => {
      repository.aggregate
        .mockResolvedValueOnce([{ grand_total: 200 }])
        .mockResolvedValueOnce([
          {
            _id: "a1",
            initDate: new Date(),
            endDate: new Date(),
            serviceId: "s1",
            total_price: 200,
          },
        ]);
      const result = await testInstance.loadInvoice({
        fields: {
          initDate: "2024-03-01",
          endDate: "2024-03-31",
        },
        options: {},
      });
      expect(result).toBeDefined();
      expect(result.total).toBe(200);
      expect(result.appointments).toHaveLength(1);
      expect(repository.aggregate).toHaveBeenCalledTimes(2);
      const firstCall = repository.aggregate.mock.calls[0][0];
      expect(firstCall.text).toContain("SUM");
      expect(firstCall.text).toContain("grand_total");
    });
  });

  describe("loadAvailableTimes query building", () => {
    it("should build query with JOINs and date conversions", async () => {
      const now = new Date("2024-06-15T12:00:00.000Z");
      repository.aggregate.mockResolvedValueOnce([
        { _id: "p1", initDate: now, endDate: now },
        { _id: "p2", initDate: now, endDate: now },
      ]);
      const result = await testInstance.loadAvailableTimes({
        professionalId: "prof1",
        initDay: "2024-06-15" as any,
        endDay: "2024-06-16" as any,
      } as any);
      expect(result).toBeDefined();
      expect(result?.data).toHaveLength(2);
      const query = repository.aggregate.mock.calls[0][0];
      expect(query.text).toContain("JOIN");
      expect(query.text).toContain("owner");
      expect(query.values).toContain("prof1");
    });
  });

  describe("handleTimezone in production mode", () => {
    it("should subtract 3 hours when FUSORARIOBR is production", async () => {

      bunMock.module("@/application/infra", () => ({
        env: { FUSORARIOBR: "production" },
      }));
      const { AppointmentAggregatePgRepository: ProdRepo } =
        require("./appointmentAggregatePgRepository");
      const prodInstance = new ProdRepo(repository);
      const now = new Date("2024-06-15T10:00:00.000Z");
      repository.aggregate.mockResolvedValueOnce([
        { _id: "1", initDate: now, endDate: now },
      ]);
      const result = await prodInstance.loadAvailableTimes({
        professionalId: "prof1",
        initDay: "2024-01-01" as any,
        endDay: "2024-01-02" as any,
      } as any);
      expect(result).toBeDefined();
      expect(result?.data?.[0]?.initDate).toBe(
        new Date("2024-06-15T07:00:00.000Z").toISOString()
      );
      // restore original mock
      bunMock.module("@/application/infra", () => ({
        env: { FUSORARIOBR: "development" },
      }));
    });
  });
});
