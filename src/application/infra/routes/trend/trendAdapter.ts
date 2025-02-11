import { adaptRoute } from "@/application/adapters";
import {
  makeAddTrendController,
  makeLoadTrendController,
  makeDeleteTrendController,
  makeUpdateTrendController,
  makeLoadTrendByPageController,
} from "@/slices/social-network/trend/controllers";

export const addTrendAdapter = () => adaptRoute(makeAddTrendController());
export const loadTrendAdapter = () => adaptRoute(makeLoadTrendController());
export const loadTrendByPageAdapter = () => adaptRoute(makeLoadTrendByPageController());
export const deleteTrendAdapter = () => adaptRoute(makeDeleteTrendController());
export const updateTrendAdapter = () => adaptRoute(makeUpdateTrendController());
