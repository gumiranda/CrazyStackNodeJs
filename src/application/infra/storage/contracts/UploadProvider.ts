export interface UploadProvider {
  uploadFile(file: any, expiresIn: number): Promise<any>;
  getSignedUrlPut(key: string, expiresIn: number): Promise<string>;
  getSignedUrl(key: string, expiresIn: number): Promise<string>;
  delete({ fileName }: any): Promise<boolean>;
}
