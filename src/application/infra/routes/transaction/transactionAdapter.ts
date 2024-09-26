import { adaptRoute } from "@/application/adapters";
import {
  makeAddTransactionController,
  makeLoadTransactionController,
  makeDeleteTransactionController,
  makeUpdateTransactionController,
  makeLoadTransactionByPageController,
} from "@/slices/payment/transaction/controllers";

export const addTransactionAdapter = () => adaptRoute(makeAddTransactionController());
export const loadTransactionAdapter = () => adaptRoute(makeLoadTransactionController());
export const loadTransactionByPageAdapter = () =>
  adaptRoute(makeLoadTransactionByPageController());
export const deleteTransactionAdapter = () =>
  adaptRoute(makeDeleteTransactionController());
export const updateTransactionAdapter = () =>
  adaptRoute(makeUpdateTransactionController());
