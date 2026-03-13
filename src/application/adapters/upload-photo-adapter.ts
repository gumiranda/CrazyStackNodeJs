import { HttpRequest } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { env } from "../infra";
import { makeUploadProvider } from "../infra/storage/storageFactory";
import { addSeconds } from "date-fns";

export const adaptUploadPhotoRoute = (controller: Controller) => {
  return async ({ body, params, query, headers, set, store }: any) => {
    const file = body?.file;
    const uploadProvider = makeUploadProvider(env.uploadProvider);
    let fileUploaded;
    const expiresInSeconds = 60 * 60 * 24 * 7;
    try {
      const uploadPayload = file instanceof Blob
        ? { file: file.stream(), mimetype: file.type }
        : file;
      fileUploaded = await uploadProvider.uploadFile(uploadPayload, expiresInSeconds);
    } catch (error) {
      set.status = 500;
      return { error: "Failed to upload files" };
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
      userId: store?.userId ?? null,
      query,
      userLogged: store?.userLogged ?? null,
      daysToNextPayment: store?.daysToNextPayment ?? null,
    };
    const { statusCode, data } = await controller.handle(httpRequest);
    set.status = statusCode;
    return data;
  };
};
export const calculateExpiration = (expiresInSeconds: number) => {
  return addSeconds(new Date(), expiresInSeconds);
};
