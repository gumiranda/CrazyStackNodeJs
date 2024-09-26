import { CloudflareR2UploadProvider } from "./cloudflare-r2/CloudflareR2UploadProvider";
import { UploadProvider } from "./contracts/UploadProvider";

const storages = {
  cloudflare_r2: CloudflareR2UploadProvider,
} as const;
export type StorageProvider = keyof typeof storages;

export const makeUploadProvider = (provider: StorageProvider): UploadProvider => {
  return new storages[provider]();
};
