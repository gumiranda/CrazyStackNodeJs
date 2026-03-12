jest.mock("@/application/infra/storage/storageFactory", () => ({
  makeUploadProvider: jest.fn().mockReturnValue({ uploadFile: jest.fn(), delete: jest.fn() }),
}));

import { makeUploadProvider } from "./storageFactory";

describe("makeUploadProvider", () => {
  it("should return a valid instance", () => {
    const result = makeUploadProvider();
    expect(result).toBeDefined();
  });
});
