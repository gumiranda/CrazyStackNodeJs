jest.mock("@/application/adapters", () => ({
  adaptRoute: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/adapters/middleware-adapter", () => ({
  adaptMiddleware: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/infra/middlewares", () => ({
  authLogged: jest.fn(() => jest.fn()),
}));
jest.mock("@/slices/appointment/controllers", () => ({
  makeAddAppointmentController: jest.fn(),
  makeLoadAppointmentController: jest.fn(),
  makeDeleteAppointmentController: jest.fn(),
  makeUpdateAppointmentController: jest.fn(),
  makeLoadAppointmentByPageController: jest.fn(),
  makeLoadAvailableTimesController: jest.fn(),
  makeLoadInvoiceController: jest.fn(),
}));

import { adaptRoute } from "@/application/adapters";
import {
  addAppointmentAdapter,
  loadAppointmentAdapter,
  loadAppointmentByPageAdapter,
  deleteAppointmentAdapter,
  updateAppointmentAdapter,
  loadAvailableTimesAdapter,
  loadInvoiceAdapter,
} from "./appointmentAdapter";
import { appointment } from "./appointmentRouter";

describe("appointmentAdapter", () => {
  it("should return a function for addAppointmentAdapter", () => {
    const result = addAppointmentAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadAppointmentAdapter", () => {
    const result = loadAppointmentAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadAppointmentByPageAdapter", () => {
    const result = loadAppointmentByPageAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for deleteAppointmentAdapter", () => {
    const result = deleteAppointmentAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for updateAppointmentAdapter", () => {
    const result = updateAppointmentAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadAvailableTimesAdapter", () => {
    const result = loadAvailableTimesAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadInvoiceAdapter", () => {
    const result = loadInvoiceAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

describe("appointmentRouter", () => {
  const mockFastify = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    addHook: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register the preHandler hook with authLogged", async () => {
    await appointment(mockFastify as any, {} as any);
    expect(mockFastify.addHook).toHaveBeenCalledWith("preHandler", expect.any(Function));
  });

  it("should register POST /appointment/add route", async () => {
    await appointment(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledWith(
      "/appointment/add",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /appointment/load route", async () => {
    await appointment(mockFastify as any, {} as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/appointment/load",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /appointment/loadInvoice route", async () => {
    await appointment(mockFastify as any, {} as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/appointment/loadInvoice",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /appointment/loadAvailableTimes route", async () => {
    await appointment(mockFastify as any, {} as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/appointment/loadAvailableTimes",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /appointment/loadByPage route", async () => {
    await appointment(mockFastify as any, {} as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/appointment/loadByPage",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register DELETE /appointment/delete route", async () => {
    await appointment(mockFastify as any, {} as any);
    expect(mockFastify.delete).toHaveBeenCalledWith(
      "/appointment/delete",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register PATCH /appointment/update route", async () => {
    await appointment(mockFastify as any, {} as any);
    expect(mockFastify.patch).toHaveBeenCalledWith(
      "/appointment/update",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register the correct number of routes", async () => {
    await appointment(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledTimes(1);
    expect(mockFastify.get).toHaveBeenCalledTimes(4);
    expect(mockFastify.delete).toHaveBeenCalledTimes(1);
    expect(mockFastify.patch).toHaveBeenCalledTimes(1);
  });
});
