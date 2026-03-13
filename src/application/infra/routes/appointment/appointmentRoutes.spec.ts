import { describe, it, expect, jest, mock } from "bun:test";
mock.module("@/application/adapters", () => ({
  adaptRoute: jest.fn(() => jest.fn()),
}));
mock.module("@/application/adapters/middleware-adapter", () => ({
  adaptMiddleware: jest.fn(() => jest.fn()),
}));
mock.module("@/application/infra/middlewares", () => ({
  authLogged: jest.fn(() => jest.fn()),
}));
mock.module("@/slices/appointment/controllers", () => ({
  makeAddAppointmentController: jest.fn(),
  makeLoadAppointmentController: jest.fn(),
  makeDeleteAppointmentController: jest.fn(),
  makeUpdateAppointmentController: jest.fn(),
  makeLoadAppointmentByPageController: jest.fn(),
  makeLoadAvailableTimesController: jest.fn(),
  makeLoadInvoiceController: jest.fn(),
}));

import { Elysia } from "elysia";
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
  it("should be a valid Elysia instance", () => {
    expect(appointment).toBeDefined();
    expect(appointment).toBeInstanceOf(Elysia);
  });
});
