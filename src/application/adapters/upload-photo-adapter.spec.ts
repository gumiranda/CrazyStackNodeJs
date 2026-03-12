jest.mock("@fastify/request-context", () => ({
  requestContext: {
    get: jest.fn().mockReturnValue({
      userId: "any_user_id",
      userLogged: { _id: "any_user_id" },
      daysToNextPayment: 30,
    }),
  },
}));

const mockUploadFile = jest.fn().mockResolvedValue({ url: "http://uploaded.com/photo.jpg", key: "photo.jpg" });
jest.mock("../infra/storage/storageFactory", () => ({
  makeUploadProvider: jest.fn().mockReturnValue({
    uploadFile: mockUploadFile,
  }),
}));
jest.mock("../infra", () => ({
  env: { uploadProvider: "cloudflare_r2" },
}));

import { adaptUploadPhotoRoute, calculateExpiration } from "./upload-photo-adapter";

describe("adaptUploadPhotoRoute", () => {
  let controller: any;
  let request: any;
  let reply: any;

  beforeEach(() => {
    mockUploadFile.mockClear();
    controller = {
      handle: jest.fn().mockResolvedValue({ statusCode: 200, data: { success: true } }),
    };
    request = {
      body: { name: "photo" },
      params: { id: "any_id" },
      query: {},
      headers: {},
      file: jest.fn().mockResolvedValue({ filename: "photo.jpg" }),
    };
    reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should call request.file()", async () => {
    const handler = adaptUploadPhotoRoute(controller);
    await handler(request, reply);
    expect(request.file).toHaveBeenCalled();
  });

  it("should call controller.handle with uploaded file data", async () => {
    const handler = adaptUploadPhotoRoute(controller);
    await handler(request, reply);
    expect(controller.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({
          url: "http://uploaded.com/photo.jpg",
          key: "photo.jpg",
          provider: "cloudflare_r2",
          expiresInSeconds: 604800,
        }),
        userId: "any_user_id",
      })
    );
  });

  it("should reply with controller result", async () => {
    const handler = adaptUploadPhotoRoute(controller);
    await handler(request, reply);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({ success: true });
  });

  it("should handle null context values", async () => {
    const { requestContext } = require("@fastify/request-context");
    requestContext.get.mockReturnValueOnce(null);
    const handler = adaptUploadPhotoRoute(controller);
    await handler(request, reply);
    expect(controller.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: null,
        userLogged: null,
        daysToNextPayment: null,
      })
    );
  });

  it("should return 500 when upload fails", async () => {
    mockUploadFile.mockRejectedValueOnce(new Error("upload error"));
    const handler = adaptUploadPhotoRoute(controller);
    await handler(request, reply);
    expect(reply.status).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({ error: "Failed to upload files" });
  });
});

describe("calculateExpiration", () => {
  it("should return a Date in the future", () => {
    const result = calculateExpiration(3600);
    expect(result).toBeInstanceOf(Date);
    expect(result.getTime()).toBeGreaterThan(new Date().getTime());
  });
  it("should add correct number of seconds", () => {
    const before = new Date();
    const result = calculateExpiration(60);
    const expectedMin = before.getTime() + 59000;
    const expectedMax = before.getTime() + 61000;
    expect(result.getTime()).toBeGreaterThanOrEqual(expectedMin);
    expect(result.getTime()).toBeLessThanOrEqual(expectedMax);
  });
});
