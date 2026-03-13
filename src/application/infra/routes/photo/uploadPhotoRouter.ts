import { Elysia, t } from "elysia";
import { authLogged } from "@/application/infra/middlewares";
import { adaptUploadPhotoRoute } from "@/application/adapters/upload-photo-adapter";
import { makeAddPhotoController } from "@/slices/photo/controllers";

export const uploadRoutes = new Elysia()
  .state("userId", null as string | null)
  .state("userLogged", null as any)
  .state("daysToNextPayment", null as any)
  .guard({ beforeHandle: [authLogged()] }, (app) =>
    app.post("/uploadPhoto", adaptUploadPhotoRoute(makeAddPhotoController()), {
      body: t.Object({
        file: t.File(),
      }),
    })
  );
