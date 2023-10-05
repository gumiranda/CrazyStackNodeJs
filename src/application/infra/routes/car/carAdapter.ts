import { adaptRoute } from "@/application/adapters";
import {
  makeAddCarController,
  makeLoadCarController,
  makeDeleteCarController,
  makeUpdateCarController,
  makeLoadCarByPageController,
} from "@/slices/car/controllers";

export const addCarAdapter = () => adaptRoute(makeAddCarController());
export const loadCarAdapter = () => adaptRoute(makeLoadCarController());
export const loadCarByPageAdapter = () => adaptRoute(makeLoadCarByPageController());
export const deleteCarAdapter = () => adaptRoute(makeDeleteCarController());
export const updateCarAdapter = () => adaptRoute(makeUpdateCarController());
