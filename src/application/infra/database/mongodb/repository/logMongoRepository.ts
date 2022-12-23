import { MongoHelper } from "@/application/infra";
import { LogRepository } from "@/application/infra/contracts";

export class LogMongoRepository implements LogRepository {
  async logError(domain: string, stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection("errors");
    await errorCollection.insertOne({ domain, stack, date: new Date() });
  }
}
