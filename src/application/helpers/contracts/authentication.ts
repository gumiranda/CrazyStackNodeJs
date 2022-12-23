export interface Authentication {
  auth(email: string, password: string): Promise<any>;
  authRefreshToken(userId: string): Promise<any>;
}
