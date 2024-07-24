import { adaptRoute } from "@/application/adapters";
import {
  makeAddCustomerController,
  makeLoadCustomerController,
  makeDeleteCustomerController,
  makeUpdateCustomerController,
  makeLoadCustomerByPageController,
} from "@/slices/payment/customer/controllers";

export const addCustomerAdapter = () => adaptRoute(makeAddCustomerController());
export const loadCustomerAdapter = () => adaptRoute(makeLoadCustomerController());
export const loadCustomerByPageAdapter = () =>
  adaptRoute(makeLoadCustomerByPageController());
export const deleteCustomerAdapter = () => adaptRoute(makeDeleteCustomerController());
export const updateCustomerAdapter = () => adaptRoute(makeUpdateCustomerController());
