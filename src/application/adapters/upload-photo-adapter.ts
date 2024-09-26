import { requestContext } from "@fastify/request-context";
import { HttpRequest } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { env } from "../infra";
import { makeUploadProvider } from "../infra/storage/storageFactory";
import { addSeconds } from "date-fns";

export const adaptUploadPhotoRoute = (controller: Controller) => {
  return async (request: any, reply: any) => {
    const { body, params, query, headers } = request;
    const {
      userId = null,
      userLogged = null,
      daysToNextPayment = null,
    }: any = (requestContext as any).get("context" as any) || {};
    const file = await request.file();
    const uploadProvider = makeUploadProvider(env.uploadProvider);
    let fileUploaded;
    const expiresInSeconds = 60 * 60 * 24 * 7;
    try {
      fileUploaded = await uploadProvider.uploadFile(file, expiresInSeconds);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to upload files" });
    }
    const httpRequest: HttpRequest = {
      body: {
        ...body,
        ...fileUploaded,
        expiresIn: calculateExpiration(expiresInSeconds),
        provider: env.uploadProvider,
        expiresInSeconds,
      },
      params,
      headers,
      userId,
      query,
      userLogged,
      daysToNextPayment,
    };
    const { statusCode, data } = await controller.handle(httpRequest);
    reply.code(statusCode).send(data);
  };
};
export const calculateExpiration = (expiresInSeconds: number) => {
  return addSeconds(new Date(), expiresInSeconds);
};
