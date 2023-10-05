import { adaptRoute } from "@/application/adapters";
import {
  makeAddMapRouteController,
  makeLoadMapRouteController,
  makeDeleteMapRouteController,
  makeUpdateMapRouteController,
  makeLoadMapRouteByPageController,
} from "@/slices/mapRoute/controllers";

export const addMapRouteAdapter = () => adaptRoute(makeAddMapRouteController());
export const loadMapRouteAdapter = () => adaptRoute(makeLoadMapRouteController());
export const loadMapRouteByPageAdapter = () =>
  adaptRoute(makeLoadMapRouteByPageController());
export const deleteMapRouteAdapter = () => adaptRoute(makeDeleteMapRouteController());
export const updateMapRouteAdapter = () => adaptRoute(makeUpdateMapRouteController());
