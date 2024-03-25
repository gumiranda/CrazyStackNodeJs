import { adaptRoute } from "@/application/adapters";
import {
  makeAddAppointmentController,
  makeLoadAppointmentController,
  makeDeleteAppointmentController,
  makeUpdateAppointmentController,
  makeLoadAppointmentByPageController,
  makeLoadAvailableTimesController,
  makeLoadInvoiceController,
} from "@/slices/appointment/controllers";

export const addAppointmentAdapter = () => adaptRoute(makeAddAppointmentController());
export const loadInvoiceAdapter = () => adaptRoute(makeLoadInvoiceController());
export const loadAppointmentAdapter = () => adaptRoute(makeLoadAppointmentController());
export const loadAppointmentByPageAdapter = () =>
  adaptRoute(makeLoadAppointmentByPageController());
export const deleteAppointmentAdapter = () =>
  adaptRoute(makeDeleteAppointmentController());
export const updateAppointmentAdapter = () =>
  adaptRoute(makeUpdateAppointmentController());
export const loadAvailableTimesAdapter = () =>
  adaptRoute(makeLoadAvailableTimesController());
