import { Elysia } from "elysia";
import { authLogged } from "@/application/infra/middlewares";
import {
  addCategoryAdapter,
  loadCategoryAdapter,
  deleteCategoryAdapter,
  updateCategoryAdapter,
  loadCategoryByPageAdapter,
} from "./categoryAdapter";

const category = new Elysia()
  .state("userId", null as string | null)
  .state("userLogged", null as any)
  .state("daysToNextPayment", null as any)
  .guard({ beforeHandle: [authLogged()] }, (app) =>
    app
      .post("/category/add", addCategoryAdapter())
      .get("/category/load", loadCategoryAdapter())
      .get("/category/loadByPage", loadCategoryByPageAdapter())
      .delete("/category/delete", deleteCategoryAdapter())
      .patch("/category/update", updateCategoryAdapter())
  );

export { category };
