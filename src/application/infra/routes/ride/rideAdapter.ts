import { adaptRoute } from "@/application/adapters";
import {
  makeAddRideController,
  makeLoadRideController,
  makeDeleteRideController,
  makeUpdateRideController,
  makeLoadRideByPageController,
} from "@/slices/ride/controllers";

export const addRideAdapter = () => adaptRoute(makeAddRideController());
export const loadRideAdapter = () => adaptRoute(makeLoadRideController());
export const loadRideByPageAdapter = () => adaptRoute(makeLoadRideByPageController());
export const deleteRideAdapter = () => adaptRoute(makeDeleteRideController());
export const updateRideAdapter = () => adaptRoute(makeUpdateRideController());
