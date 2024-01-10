import { adaptRoute } from "@/application/adapters";
import {
  makeAddRouteDriverController,
  makeLoadRouteDriverController,
  makeDeleteRouteDriverController,
  makeUpdateRouteDriverController,
  makeLoadRouteDriverByPageController,
} from "@/slices/routeDriver/controllers";

export const addRouteDriverAdapter = () => adaptRoute(makeAddRouteDriverController());
export const loadRouteDriverAdapter = () => adaptRoute(makeLoadRouteDriverController());
export const loadRouteDriverByPageAdapter = () =>
  adaptRoute(makeLoadRouteDriverByPageController());
export const deleteRouteDriverAdapter = () =>
  adaptRoute(makeDeleteRouteDriverController());
export const updateRouteDriverAdapter = () =>
  adaptRoute(makeUpdateRouteDriverController());
