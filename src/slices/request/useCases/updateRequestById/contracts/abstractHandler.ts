import { Handler } from "./handler";

export abstract class AbstractHandler implements Handler {
  private nextHandler!: Handler;
  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }
  public async handle(request: any): Promise<any> {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}
