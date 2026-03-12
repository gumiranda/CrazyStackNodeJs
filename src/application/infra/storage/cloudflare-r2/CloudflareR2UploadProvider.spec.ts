const mockSend = jest.fn().mockResolvedValue({});
const mockDone = jest.fn().mockResolvedValue({});

jest.mock("@aws-sdk/client-s3", () => ({
  S3Client: jest.fn().mockImplementation(() => ({
    send: mockSend,
  })),
  PutObjectCommand: jest.fn().mockImplementation((params: any) => ({ ...params, _cmd: "Put" })),
  GetObjectCommand: jest.fn().mockImplementation((params: any) => ({ ...params, _cmd: "Get" })),
  DeleteObjectCommand: jest.fn().mockImplementation((params: any) => ({ ...params, _cmd: "Delete" })),
}));
jest.mock("@aws-sdk/lib-storage", () => ({
  Upload: jest.fn().mockImplementation(() => ({
    done: mockDone,
  })),
}));
jest.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: jest.fn().mockResolvedValue("https://signed-url.com"),
}));
jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("test-uuid"),
}));
jest.mock("@/application/infra/config", () => ({
  env: {
    cloudflareAccountId: "test-account",
    awsAccessKeyId: "test-key",
    awsSecretAccessKey: "test-secret",
    bucketName: "test-bucket",
  },
}));

import { CloudflareR2UploadProvider } from "./CloudflareR2UploadProvider";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

describe("CloudflareR2UploadProvider", () => {
  let sut: CloudflareR2UploadProvider;
  beforeEach(() => {
    jest.clearAllMocks();
    sut = new CloudflareR2UploadProvider();
  });
  it("should create an instance", () => {
    expect(sut).toBeDefined();
  });
  it("should create S3Client with correct config", () => {
    expect(S3Client).toHaveBeenCalledWith(
      expect.objectContaining({
        region: "auto",
        endpoint: "https://test-account.r2.cloudflarestorage.com",
        credentials: {
          accessKeyId: "test-key",
          secretAccessKey: "test-secret",
        },
      })
    );
  });

  describe("uploadFile", () => {
    const fakeFile = { file: Buffer.from("test"), mimetype: "image/png" };

    it("should upload a file and return url and key", async () => {
      const result = await sut.uploadFile(fakeFile, 3600);
      expect(result).toEqual({ url: "https://signed-url.com", key: "uploads/test-uuid" });
    });
    it("should call Upload with correct params", async () => {
      await sut.uploadFile(fakeFile, 3600);
      expect(Upload).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({
            Bucket: "test-bucket",
            Key: "uploads/test-uuid",
            Body: fakeFile.file,
            ContentType: "image/png",
          }),
        })
      );
    });
    it("should call upload.done()", async () => {
      await sut.uploadFile(fakeFile, 3600);
      expect(mockDone).toHaveBeenCalledTimes(1);
    });
    it("should call getSignedUrl after upload", async () => {
      await sut.uploadFile(fakeFile, 3600);
      expect(getSignedUrl).toHaveBeenCalledTimes(1);
    });
    it("should rethrow if upload.done throws", async () => {
      mockDone.mockRejectedValueOnce(new Error("upload_error"));
      await expect(sut.uploadFile(fakeFile, 3600)).rejects.toThrow("upload_error");
    });
  });

  describe("getSignedUrlPut", () => {
    it("should get a signed url for PUT", async () => {
      const result = await sut.getSignedUrlPut("test-key", 3600);
      expect(result).toBe("https://signed-url.com");
    });
    it("should call getSignedUrl with PutObjectCommand and expiresIn", async () => {
      await sut.getSignedUrlPut("my-key", 7200);
      expect(getSignedUrl).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ _cmd: "Put", Bucket: "test-bucket", Key: "my-key" }),
        { expiresIn: 7200 }
      );
    });
    it("should rethrow if getSignedUrl throws", async () => {
      (getSignedUrl as jest.Mock).mockRejectedValueOnce(new Error("sign_put_error"));
      await expect(sut.getSignedUrlPut("key", 3600)).rejects.toThrow("sign_put_error");
    });
  });

  describe("getSignedUrl", () => {
    it("should get a signed url for GET", async () => {
      const result = await sut.getSignedUrl("test-key", 3600);
      expect(result).toBe("https://signed-url.com");
    });
    it("should call getSignedUrl with GetObjectCommand and expiresIn", async () => {
      await sut.getSignedUrl("my-key", 1800);
      expect(getSignedUrl).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ _cmd: "Get", Bucket: "test-bucket", Key: "my-key" }),
        { expiresIn: 1800 }
      );
    });
    it("should rethrow if getSignedUrl throws", async () => {
      (getSignedUrl as jest.Mock).mockRejectedValueOnce(new Error("sign_get_error"));
      await expect(sut.getSignedUrl("key", 3600)).rejects.toThrow("sign_get_error");
    });
  });

  describe("delete", () => {
    it("should delete a file and return true", async () => {
      const result = await sut.delete({ fileName: "test-key" });
      expect(result).toBe(true);
    });
    it("should call client.send with DeleteObjectCommand", async () => {
      await sut.delete({ fileName: "my-file.png" });
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ _cmd: "Delete", Bucket: "test-bucket", Key: "my-file.png" })
      );
    });
    it("should rethrow if client.send throws", async () => {
      mockSend.mockRejectedValueOnce(new Error("delete_error"));
      await expect(sut.delete({ fileName: "key" })).rejects.toThrow("delete_error");
    });
  });
});
