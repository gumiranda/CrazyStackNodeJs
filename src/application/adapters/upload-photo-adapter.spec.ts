import { describe, it, expect, beforeEach, jest, mock } from "bun:test";

const mockUploadFile = jest.fn().mockResolvedValue({ url: "http://uploaded.com/photo.jpg", key: "photo.jpg" });
mock.module("../infra/storage/storageFactory", () => ({
  makeUploadProvider: jest.fn().mockReturnValue({
    uploadFile: mockUploadFile,
  }),
}));
mock.module("../infra", () => ({
  env: { uploadProvider: "cloudflare_r2" },
}));

import { adaptUploadPhotoRoute, calculateExpiration } from "./upload-photo-adapter";

describe("adaptUploadPhotoRoute", () => {
  let controller: any;
  let context: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUploadFile.mockClear();
    controller = {
      handle: jest.fn().mockResolvedValue({ statusCode: 200, data: { success: true } }),
    };
    context = {
      body: { name: "photo", file: new Blob(["test"], { type: "image/jpeg" }) },
      params: { id: "any_id" },
      query: {},
      headers: {},
      set: { status: 0 },
      store: {
        userId: "any_user_id",
        userLogged: { _id: "any_user_id" },
        daysToNextPayment: 30,
      },
    };
  });

  it("should call controller.handle with uploaded file data", async () => {
    const handler = adaptUploadPhotoRoute(controller);
    await handler(context);
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

  it("should set status and return data", async () => {
    const handler = adaptUploadPhotoRoute(controller);
    const result = await handler(context);
    expect(context.set.status).toBe(200);
    expect(result).toEqual({ success: true });
  });

  it("should handle empty store values", async () => {
    context.store = {};
    const handler = adaptUploadPhotoRoute(controller);
    await handler(context);
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
    const result = await handler(context);
    expect(context.set.status).toBe(500);
    expect(result).toEqual({ error: "Failed to upload files" });
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
