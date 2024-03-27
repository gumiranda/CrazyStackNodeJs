import { adaptRoute } from "@/application/adapters";
import {
  makeAddChargeController,
  makeLoadChargeController,
  makeDeleteChargeController,
  makeUpdateChargeController,
  makeLoadChargeByPageController,
} from "@/slices/payment/charge/controllers";

export const addChargeAdapter = () => adaptRoute(makeAddChargeController());
export const loadChargeAdapter = () => adaptRoute(makeLoadChargeController());
export const loadChargeByPageAdapter = () => adaptRoute(makeLoadChargeByPageController());
export const deleteChargeAdapter = () => adaptRoute(makeDeleteChargeController());
export const updateChargeAdapter = () => adaptRoute(makeUpdateChargeController());
