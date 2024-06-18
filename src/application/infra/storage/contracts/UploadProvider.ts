export interface UploadProvider {
  uploadFile(file: any): Promise<string>;
}
