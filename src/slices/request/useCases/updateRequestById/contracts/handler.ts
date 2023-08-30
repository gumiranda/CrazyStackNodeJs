export interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: any): Promise<any>;
}
