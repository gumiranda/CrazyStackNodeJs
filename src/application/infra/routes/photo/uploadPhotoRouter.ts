import { authLogged } from "@/application/infra/middlewares";

import { makeAddPhotoController } from "@/slices/photo/controllers";
import { adaptRoute } from "../../../adapters/router-adapter";

export const uploadRoutes = async (fastify: any) => {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/uploadPhoto", adaptRoute(makeAddPhotoController()));
};
