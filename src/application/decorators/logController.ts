import { Controller, LogRepository } from "@/application/infra/contracts";
import { HttpRequest, HttpResponse } from "../helpers";
export class LogController implements Controller {
  constructor(
    private readonly domain: string,
    private readonly controller: Controller,
    private readonly logRepository: LogRepository
  ) {}
  execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    return this.controller.execute(httpRequest);
  }
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const httpResponse = await this.execute(httpRequest);
    if (httpResponse?.statusCode === 500) {
      await this.logRepository.logError(this.domain, httpResponse?.data);
    }
    return httpResponse;
  }
}
