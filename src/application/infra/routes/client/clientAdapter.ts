import { adaptRoute } from "@/application/adapters";
import {
  makeAddClientController,
  makeLoadClientController,
  makeDeleteClientController,
  makeUpdateClientController,
  makeLoadClientByPageController,
} from "@/slices/client/controllers";

export const addClientAdapter = () => adaptRoute(makeAddClientController());
export const loadClientAdapter = () => adaptRoute(makeLoadClientController());
export const loadClientByPageAdapter = () => adaptRoute(makeLoadClientByPageController());
export const deleteClientAdapter = () => adaptRoute(makeDeleteClientController());
export const updateClientAdapter = () => adaptRoute(makeUpdateClientController());
