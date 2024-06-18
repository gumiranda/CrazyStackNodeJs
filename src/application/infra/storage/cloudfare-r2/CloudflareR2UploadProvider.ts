import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";
import { UploadProvider } from "../contracts/UploadProvider";
import { env } from "../../config";

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
    } as S3ClientConfig);
  }

  async uploadFile(file: any): Promise<string> {
    const key = `uploads/${Date.now()}-${file?.filename?.replace(/ /g, "_")}`;
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
    return this.getSignedUrl(key);
  }
  async getSignedUrlPut(key: string): Promise<string> {
    const signedUrl = await getSignedUrl(
      this.client,
      new PutObjectCommand({
        Bucket: env.bucketName,
        Key: key,
      }),
      {
        expiresIn: 60 * 60 * 24, // URL válida por 1 minuto
      }
    );
    // const response = await axios.put(signedUrlPut, params.Body, {
    //   headers: {
    //     "Content-Type": params.ContentType,
    //   },
    // });
    return signedUrl;
  }
  async getSignedUrl(key: string): Promise<string> {
    const signedUrl = await getSignedUrl(
      this.client,
      new GetObjectCommand({
        Bucket: env.bucketName,
        Key: key,
      }),
      {
        expiresIn: 60 * 60 * 24, // URL válida por 1 dia
      }
    );
    return signedUrl;
  }
  async delete({ fileName }: any): Promise<boolean> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: env.bucketName,
        Key: fileName,
      })
    );
    return true;
  }
}
