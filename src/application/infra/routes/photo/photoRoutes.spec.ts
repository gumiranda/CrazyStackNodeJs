import { describe, it, expect, jest, mock } from "bun:test";
mock.module("@/application/adapters", () => ({
  adaptRoute: jest.fn(() => jest.fn()),
}));
mock.module("@/application/adapters/middleware-adapter", () => ({
  adaptMiddleware: jest.fn(() => jest.fn()),
}));
mock.module("@/application/adapters/upload-photo-adapter", () => ({
  adaptUploadPhotoRoute: jest.fn(() => jest.fn()),
}));
mock.module("@/application/infra/middlewares", () => ({
  authLogged: jest.fn(() => jest.fn()),
}));
mock.module("@/slices/photo/controllers", () => ({
  makeAddPhotoController: jest.fn(),
  makeLoadPhotoController: jest.fn(),
  makeDeletePhotoController: jest.fn(),
  makeLoadPhotoByPageController: jest.fn(),
}));

import { Elysia } from "elysia";
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
  it("should be a valid Elysia instance", () => {
    expect(photo).toBeDefined();
    expect(photo).toBeInstanceOf(Elysia);
  });
});

describe("uploadPhotoRouter", () => {
  it("should be a valid Elysia instance", () => {
    expect(uploadRoutes).toBeDefined();
    expect(uploadRoutes).toBeInstanceOf(Elysia);
  });
});
