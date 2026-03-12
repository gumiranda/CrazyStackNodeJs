jest.mock("@/application/adapters", () => ({
  adaptRoute: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/adapters/middleware-adapter", () => ({
  adaptMiddleware: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/adapters/upload-photo-adapter", () => ({
  adaptUploadPhotoRoute: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/infra/middlewares", () => ({
  authLogged: jest.fn(() => jest.fn()),
}));
jest.mock("@/slices/photo/controllers", () => ({
  makeAddPhotoController: jest.fn(),
  makeLoadPhotoController: jest.fn(),
  makeDeletePhotoController: jest.fn(),
  makeLoadPhotoByPageController: jest.fn(),
}));

import { adaptRoute } from "@/application/adapters";
import { adaptUploadPhotoRoute } from "@/application/adapters/upload-photo-adapter";
import {
  addPhotoAdapter,
  loadPhotoAdapter,
  loadPhotoByPageAdapter,
  deletePhotoAdapter,
} from "./photoAdapter";
import { photo } from "./photoRouter";
import { uploadRoutes } from "./uploadPhotoRouter";

describe("photoAdapter", () => {
  it("should return a function for addPhotoAdapter", () => {
    const result = addPhotoAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadPhotoAdapter", () => {
    const result = loadPhotoAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadPhotoByPageAdapter", () => {
    const result = loadPhotoByPageAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for deletePhotoAdapter", () => {
    const result = deletePhotoAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

describe("photoRouter", () => {
  const mockFastify = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    addHook: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register the preHandler hook with authLogged", async () => {
    await photo(mockFastify as any);
    expect(mockFastify.addHook).toHaveBeenCalledWith("preHandler", expect.any(Function));
  });

  it("should register POST /photo/add route", async () => {
    await photo(mockFastify as any);
    expect(mockFastify.post).toHaveBeenCalledWith(
      "/photo/add",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /photo/load route", async () => {
    await photo(mockFastify as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/photo/load",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /photo/loadByPage route", async () => {
    await photo(mockFastify as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/photo/loadByPage",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register DELETE /photo/delete route", async () => {
    await photo(mockFastify as any);
    expect(mockFastify.delete).toHaveBeenCalledWith(
      "/photo/delete",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register the correct number of routes", async () => {
    await photo(mockFastify as any);
    expect(mockFastify.post).toHaveBeenCalledTimes(1);
    expect(mockFastify.get).toHaveBeenCalledTimes(2);
    expect(mockFastify.delete).toHaveBeenCalledTimes(1);
    expect(mockFastify.patch).not.toHaveBeenCalled();
  });
});

describe("uploadPhotoRouter", () => {
  const mockFastify = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    addHook: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register the preHandler hook with authLogged", async () => {
    await uploadRoutes(mockFastify as any);
    expect(mockFastify.addHook).toHaveBeenCalledWith("preHandler", expect.any(Function));
  });

  it("should register POST /uploadPhoto route", async () => {
    await uploadRoutes(mockFastify as any);
    expect(mockFastify.post).toHaveBeenCalledWith("/uploadPhoto", expect.any(Function));
  });

  it("should call adaptUploadPhotoRoute", async () => {
    await uploadRoutes(mockFastify as any);
    expect(adaptUploadPhotoRoute).toHaveBeenCalled();
  });

  it("should register exactly one route", async () => {
    await uploadRoutes(mockFastify as any);
    expect(mockFastify.post).toHaveBeenCalledTimes(1);
    expect(mockFastify.get).not.toHaveBeenCalled();
    expect(mockFastify.delete).not.toHaveBeenCalled();
    expect(mockFastify.patch).not.toHaveBeenCalled();
  });
});
