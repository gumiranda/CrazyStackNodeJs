import { adaptRoute } from "@/application/adapters";
import {
  makeAddProductController,
  makeLoadProductController,
  makeDeleteProductController,
  makeUpdateProductController,
  makeLoadProductByPageController,
} from "@/slices/product/controllers";

export const addProductAdapter = () => adaptRoute(makeAddProductController());
export const loadProductAdapter = () => adaptRoute(makeLoadProductController());
export const loadProductByPageAdapter = () =>
  adaptRoute(makeLoadProductByPageController());
export const deleteProductAdapter = () => adaptRoute(makeDeleteProductController());
export const updateProductAdapter = () => adaptRoute(makeUpdateProductController());
