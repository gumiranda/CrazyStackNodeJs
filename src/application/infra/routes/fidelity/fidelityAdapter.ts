import { adaptRoute } from "@/application/adapters";
import {
  makeAddFidelityController,
  makeLoadFidelityController,
  makeDeleteFidelityController,
  makeUpdateFidelityController,
  makeLoadFidelityByPageController,
} from "@/slices/fidelity/controllers";

export const addFidelityAdapter = () => adaptRoute(makeAddFidelityController());
export const loadFidelityAdapter = () => adaptRoute(makeLoadFidelityController());
export const loadFidelityByPageAdapter = () =>
  adaptRoute(makeLoadFidelityByPageController());
export const deleteFidelityAdapter = () => adaptRoute(makeDeleteFidelityController());
export const updateFidelityAdapter = () => adaptRoute(makeUpdateFidelityController());
