import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadProvider } from "../contracts/UploadProvider";
import { env } from "../../config";
import { v4 as uuidv4 } from "uuid";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class CloudflareR2UploadProvider implements UploadProvider {
  private client: S3Client;
  constructor() {
    this.client = new S3Client({
      region: "auto",
      endpoint: `https://${env.cloudflareAccountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.awsAccessKeyId,
        secretAccessKey: env.awsSecretAccessKey,
      },
    });
  }
  async uploadFile(file: any, expiresIn: number): Promise<any> {
    const key = `uploads/${uuidv4()}`;
    const params = {
      Bucket: env.bucketName,
      Key: key,
      Body: file.file,
      ContentType: file.mimetype,
    };
    const upload = new Upload({
      client: this.client,
      params,
    });
    await upload.done();
    const url = await this.getSignedUrl(key, expiresIn);
    return { url, key };
  }
  async getSignedUrlPut(key: string, expiresIn: number): Promise<string> {
    return getSignedUrl(
      this.client,
      new PutObjectCommand({
        Bucket: env.bucketName,
        Key: key,
      }),
      { expiresIn }
    );
  }
  async getSignedUrl(key: string, expiresIn: number): Promise<string> {
    return getSignedUrl(
      this.client,
      new GetObjectCommand({
        Bucket: env.bucketName,
        Key: key,
      }),
      { expiresIn }
    );
  }
  async delete({ fileName }: any): Promise<boolean> {
    await this.client.send(
      new DeleteObjectCommand({ Bucket: env.bucketName, Key: fileName })
    );
    return true;
  }
}
