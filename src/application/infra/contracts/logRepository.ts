export interface LogRepository {
  logError(domain: string, stack: string): Promise<void>;
}
