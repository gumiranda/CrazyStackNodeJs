import { authLogged } from "@/application/infra/middlewares";
import { FastifyReply } from "fastify";
import { makeUploadProvider } from "../../storage/storageFactory";
import { env } from "../../config";

export const uploadRoutes = async (fastify: any) => {
  fastify.addHook("preHandler", authLogged());

  fastify.post("/uploadPhoto", uploadPhotos);
};

export const uploadPhotos = async (req: any, reply: FastifyReply) => {
  const file = await req.file();

  const uploadProvider = makeUploadProvider(env.uploadProvider);

  try {
    const fileUrls = await uploadProvider.uploadFile(file);
    return reply
      .status(200)
      .send({ message: "Files uploaded successfully", urls: fileUrls });
  } catch (error) {
    return reply.status(500).send({ error: "Failed to upload files" });
  }
};
