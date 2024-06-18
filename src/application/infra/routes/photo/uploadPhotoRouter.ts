import { authLogged } from "@/application/infra/middlewares";

import { adaptUploadPhotoRoute } from "@/application/adapters/upload-photo-adapter";
import { makeAddPhotoController } from "@/slices/photo/controllers";

export const uploadRoutes = async (fastify: any) => {
  fastify.addHook("preHandler", authLogged());

  fastify.post("/uploadPhoto", adaptUploadPhotoRoute(makeAddPhotoController()));
};
