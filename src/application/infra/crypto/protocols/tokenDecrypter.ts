export interface TokenDecrypter {
  decrypt(value: string): Promise<string>;
}
