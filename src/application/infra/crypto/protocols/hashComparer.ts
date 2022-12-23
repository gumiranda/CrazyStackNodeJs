export interface HashComparer {
  compare(password: string, hashedText: string): Promise<boolean>;
}
