import { makeUploadProvider } from "./storageFactory";
import { CloudflareR2UploadProvider } from "./cloudflare-r2/CloudflareR2UploadProvider";

describe("storageFactory", () => {
  test("should return CloudflareR2UploadProvider when provider is cloudflare_r2", () => {
    const provider = makeUploadProvider("cloudflare_r2");
    expect(provider).toBeInstanceOf(CloudflareR2UploadProvider);
  });
});
